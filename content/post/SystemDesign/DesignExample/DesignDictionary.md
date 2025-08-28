+++
title = 'Design Word Dictionary.'
date = 2025-07-02T00:40:28+05:30
url = "/post/systemdesign/designexample/DesignDictionary"
tags = ['interview question', 'system design']
categories = ['low level design', 'system design', 'high level design']
+++

**Requirement**

The service exposes endpoints for getting the meaning given the word.  
The dictionary is weekly updated through a changelog which has the words and meanings that needs to be updated and this changelog will contain at max 1000 words.  
The total size of the dictionary is 1TB and it holds 171476 words.

No traditional db.

5M request per minute.  ~83,333 QPS

Weekly the data update at max 1000 word. Maintains strong consistency for lookups after each changelog.

**Additional Requirement** - We look into the product vision as well.  
Sub-ms lookups for common words.  
**99.999%** read availability.  
Full rollback if a bad changelog is pushed.  
Versioned storage for audit & compliance.  
**Stateless** deploys with rolling updates.  
Easy to maintain, small operational footprint.

Name|Number of Bytes|Power of 10|
|---|---|---|
Kilobytes (KB)|1000|10^3
Megabytes (MB)|1,000,000|10^ 6
Gigabytes (GB)|1,000,000,000|10^9
Terabyte (TB)|1,000,000,000,000|10^12

**Large data size vs small word count -** 1TB for 171K words. It means 10^12 / 10^5 = 10^7bytes. 1MB = 10^6 bytes. 10^7 bytes = 10 MB. It means each word + meaning is ~10MB on average — likely due to detailed meanings, usage examples, synonyms, antonyms, etc.

**Low write frequency, high read performance -** Needs an architecture that favors read-optimized storage and caching.

**Atomic batch update -** Updates must be atomic — either all changes apply or none.

### **HIgh Level Architecture**

**API Layer** - GET `/word/{word}` and POST `/changelog`

Service Layer - Orchestrate lookup, caching, validation. Alies changelog updates.

Storage Layer - Primary storage for word data. Write ahead log or versioning for rollback.

Cache Layer - Hot words (most queried) cached in RAM.

Batch Processor - Processes changelog every week.

### storage Option.

Relational DB (e.g., PostgreSQL) - ACID, good for versioning, transactional batch updates. Might not scale well for
large blob data
NoSQL (e.g., Cassandra, DynamoDB) - High read throughput, easy scaling. Harder to guarantee strict consistency for batch
updates.
Object Store (e.g., S3) + Index - Cheap, scales well, good for large text. Needs a fast index for lookups.

Hybrid -
Primary data in an Object Store (S3) — 1TB dictionary blobs.
**Word Index** in a fast key-value store (e.g., DynamoDB, RocksDB).

Maps word → object store location.

Small enough to fit in memory for blazing fast lookups.

Client → API → Cache → Word Index → Object Store → Response.

First check in-memory cache (Redis). If cache miss, lookup index to get location. Fetch word meaning blob from Object
Store. Return to client. Update cache for next time.

Admin uploads changelog → stored as a file in staging area. Batch Processor: Validates changelog. Creates a new version
of affected blobs. Updates index atomically. On success, old blobs can be deleted later. If error → rollback index
pointer to previous version.

Use object versioning in the store (e.g., S3 versioning). Word index should store version pointer. Rollback = point
index back to previous version. No partial update risk.

No traditional db.

Use a modern **file-based storage with index + object store pattern** — inspired by how search engines & CDNs work.

👉 Key Idea:

Store meanings as immutable files (JSON, Parquet, Avro).

Use LSM-tree style index: a compact key-value index built in embedded storage, or even a memory-mapped file.

Use object storage (e.g., Amazon S3) for durability.

Cache hot words in memory or on SSDs close to compute.

High Level.

API layer — Stateless HTTP servers (e.g., Spring Boot / FastAPI).   
Embedded KV Store — Use RocksDB, BadgerDB, LMDB.

Stores word → blob pointer or offset.

Local to each node or replicated by consensus.

BlobStore — Stores big JSON/Parquet files for meanings.

In-Memory Cache — Redis or local LRU for super-hot words.

No traditional DB. RocksDB is an embedded, file-backed key-value store.

| Component            | Role                                                              |
|----------------------|-------------------------------------------------------------------|
| 🚪 API Nodes         | Stateless REST servers.                                           |
| 🗂️ Local Index      | RocksDB or LMDB, local-only.                                      |
| ☁️ Blob Store        | S3 (immutable).                                                   |
| 🧊 CDN               | Cache blobs at edge.                                              |
| ⚡ In-memory Cache    | Local LRU + optional Redis Cluster.                               |
| 📦 Changelog Job     | Validates, builds new blobs, new index, swaps pointer.            |
| 🧩 Version Pointer   | Tiny file in S3 or etcd.                                          |
| 🔄 Config Sync       | Each node pulls version pointer on boot & refreshes every minute. |

Aspect - Choice  
Index - RocksDB on local disk (EBS/SSD)
Meaning storage - Chunked JSON/Parquet blobs in S3  
Updates - New versioned blobs → pointer in index updated  
Versioning - Immutable blobs, index switch is atomic.  
Rollback - Roll back pointer to older blob version

Example:

Word: “apple”

Index: apple → blob_uri: s3://dict/words_v2/abc123.json, offset: 205

Server fetches only that slice.

Local Index:

RocksDB or LMDB — embedded KV store, file on disk:

```
Key: "serendipity"
Value: {
"blob": "shard-0042.parquet",
"offset": 9583
}
```

offset means byte offset or row ID.

This index is tiny (a few GB). It fits fully in memory if needed.

How does RocksDB help here?

RocksDB is just an embedded key-value store.

It lives on local disk.

Reads are local, low-latency.

It handles SSTable compaction, LSM-tree mechanics.

You do NOT need a DB server — the process owns the files.

Why not just a flat file index?

A sorted flat file works too!

But with 170K entries it’s easier to use RocksDB to handle:

Binary search for lookups.

Fast batch rebuild on changelog.

Atomic compaction.

Example:

lookup(word) → RocksDB .get(key) → returns blob + offset.

If hot: cache the resolved meaning.

If cold: read slice from blob in S3 or disk.

Read Path - If hit in local cache → sub-ms.
✅ If hit in RocksDB → index lookup takes ~1ms, blob read depends on local vs remote.
✅ Cold blob → fallback to S3 → possible CDN edge hit.
✅ For super-hot blobs → pre-fetch shard locally or use SSD scratch disk.

Realistic Weekly Update:

Upload changelog: JSON or CSV.
Example:

```json

[
  {
    "word": "serendipity",
    "meaning": "... new meaning ..."
  },
  {
    "word": "effervescent",
    "meaning": "... new word ..."
  }
]

```

Validation Job:

Runs in CI/CD or Airflow.

Checks for syntax errors, duplicate words.

Verifies no accidental deletion of unrelated words.

Batch Processor:

Generates new blob files (Parquet or JSON).

Builds new RocksDB index:

Bulk import all mappings.

Uploads blobs to S3.

Writes new version.json with new version ID.

Cutover:

Health checks: spin up a shadow read service → hit sample words → verify new version.

If healthy → do atomic pointer swap: update version.json.

Clients read pointer on startup → pick new index.

Old version is untouched → rollback = switch pointer back.

| Failure               | Mitigation                                   |
|-----------------------|----------------------------------------------|
| Blob read slow        | Use CDN + regional edge cache                |
| Index corruption      | Keep previous version + RocksDB snapshot     |
| Bad changelog         | Detect in validation, catch in shadow deploy |
| Partial deploy        | Impossible: pointer switch is atomic         |
| Node disk full        | Monitor IOPS & capacity, scale horizontally  |
| Hotspot word overload | Cache layer with LRU & Redis Cluster         |

Hot word % → plan Redis RAM size.

Cold word % → plan S3 bandwidth.

Peak QPS → plan node count.

Test with Locust / K6.

Code Structure.

index/build_index.py: Build RocksDB index.

api/app.py: API server, load index, serve /word/{word}.

blobs/: Local blobs for prototype — simulate S3.

version.json: Points to current index version.

v1 - Single node, Local Disk Only, Prototype with RockDb and Json file.  
v2 - USe S3 for blob store. Use CDN for edge hits.  
v3 - Add Redis layer for super-hot words. Add local SSD scratch disk for blobs.  
v4 - Fully stateless API fleet. Self-healing index sync - on deploy, node pulls latest version index.  
v5 - Multi-region deploy. Version pointer via global config store.

Read-heavy, immutable design - Immutable blobs → no corruption. Single pointer switch → atomic versioning.

No DB vendor lock-in - Pure file + object store + embedded index → simple infra.

Cheap scale - Only cost is compute & storage. CDN offloads 80–90% traffic.

Extremely simple ops - One pointer swap → all done. Rollback is trivial.

No deadlocks - LSM index is local & read-only. No distributed locks needed.

High availability by design - Any API node can serve any word if it has index + blob access.

Minimal moving parts -Only deploy new blobs and index files.

GET /word/{word}
1️⃣ User hits /word/{word}.
2️⃣ API checks local LRU.
3️⃣ If miss → query RocksDB → get {shard, offset}.
4️⃣ Check local SSD for shard:

If local: open file, seek, read.

Else: fetch from CDN → store on disk → read.
5️⃣ Cache meaning in LRU.
6️⃣ Return JSON.

Latency:

Hot LRU: ~0.5ms

RocksDB + local shard: ~1ms

CDN pull: 10–50ms

S3 fallback (should be rare): 50–100ms

📌 POST /changelog
Admin upload only.

1️⃣ Upload changelog.json:

json
Copy
Edit
[
{"word": "serendipity", "meaning": "..."},
{"word": "fugacious", "meaning": "..."}
]
2️⃣ Validate

Dedupes, syntax, diff old vs new.

Dry-run build → test lookup keys.

3️⃣ Build

New blob files: chunk new & old words.

Bulk-generate new RocksDB index.

4️⃣ Store

Upload blobs to S3 under v43/.

Upload new index words.db to S3.

5️⃣ Smoke Test

Spin up shadow API node → load new index → sample requests → compare.

6️⃣ Swap

Update version.json → active_version: "v43"

7️⃣ Nodes pick up

Pull version.json → if changed, hot-swap index, discard old.

8️⃣ Rollback

Flip version.json back

File-based index = cheap, fast, resilient.

Object store = infinite capacity, high durability.

CDN = global scale for hot words.

Changelog = versioned, safe, simple.

Ops = push files, swap pointer.

# Using Db.

| With File/No DB                | With DB                                  |
|--------------------------------|------------------------------------------|
| Immutable files, RocksDB index | Normal relational DB table               |
| Pointer swap for versioning    | Schema versioning, transactional updates |
| Read path must slice files     | DB handles read, cache holds hot words   |
| Rollback = pointer flip        | Rollback = transaction + version flag    |
| Local index for speed          | DB handles index + query plan            |
| CDN only for blob files        | CDN optional (or used for static docs)   |

The data Model.
A relational table - dictionary_word -

| Column       | Type         | Notes                   |
|--------------|--------------|-------------------------|
| `word`       | VARCHAR(128) | PK, indexed             |
| `meaning`    | TEXT         | JSON blob or large text |
| `version`    | INT          | Versioning if needed    |
| `created_at` | TIMESTAMP    | For audit               |
| `updated_at` | TIMESTAMP    | For audit               |

word must be UNIQUE.

B-Tree index on word → fast WHERE word = ? lookup.

Optional GIN index if meaning is JSON and you want partial JSON queries later.

GET /word/{word}

1️⃣ Request hits API Gateway → Service → Cache Layer.
2️⃣ If word is in Redis → instant return.
3️⃣ If miss → query DB: SELECT meaning FROM dictionary_word WHERE word = ?.
4️⃣ Populate Redis with word → next request is cache hit.

✅ POST /changelog

1️⃣ Admin uploads JSON or CSV.
2️⃣ Batch validator: check syntax, required fields.
3️⃣ Batch job: run in transaction:

sql
Copy
Edit
BEGIN;
FOR EACH word IN changelog:
UPSERT (INSERT ON CONFLICT DO UPDATE)
COMMIT;
4️⃣ If any word fails → full rollback.
5️⃣ After commit, invalidate cache keys for updated words.

**Consistent**.

DB guarantees ACID — no partial updates.

Changelog runs inside transaction.

If you want multi-version: add version column, mark active = true → swap flags at once.

If DB size grows:

Postgres → use table partitioning or hash-shard by first letter (A → Z).

DynamoDB → auto-partitions by hash key (word).

For massive scale: use read replicas to spread read load.

Pareto applies: top 10% of words get 90% of traffic.

Redis: keep top 10K words fully cached.

Expire with TTL (or no TTL, invalidate on changelog push).

Use LRU or LFU eviction.

API layer: stateless → auto-scale pods.

Redis: must run as a cluster for 100K QPS+.

DB:

99.9% reads hit cache.

Remaining reads hit DB.

Use read replicas.

Scale with connection pooling.

Use prepared statements → no query parsing cost.

If changelog has bugs:

Keep backup table: dictionary_word_backup.

Or use version flags → old rows stay in DB.

Rollback = flag old rows active, new inactive.

Failure Handing.

| Failure        | Solution                                              |
|----------------|-------------------------------------------------------|
| Cache down     | Fall back to DB, hits higher latency                  |
| DB write fails | Transaction rollback                                  |
| DB read slow   | Add replicas, index tuning                            |
| Deadlocks      | Careful bulk upserts, proper isolation                |
| Conflicts      | Use `INSERT ON CONFLICT` with clear primary key rules |

Throughput and Deadlock.
GET is pure read, no lock contention.

POST is a single batch — single writer per changelog.

DB can do row-level locks, but no deadlock if only one batch job runs at once.

Keep changelog small (< 1K rows) → writes complete in seconds.

Cose Model.

| Layer     | Cost Impact                                         |
|-----------|-----------------------------------------------------|
| DB        | More expensive than pure blob store but simpler ops |
| Redis     | Adds infra, but worth it for hot reads              |
| API nodes | Scale linearly                                      |
| Changelog | Cheap batch job                                     |

| Factor           | Plan                                         |
|------------------|----------------------------------------------|
| DB IOPS          | Sized for 0.1% read misses → 1K–2K QPS to DB |
| Redis RAM        | Sized for top \~50K words fully cached       |
| Write throughput | 1K row upsert per week — trivial             |
| Read replicas    | Add replicas if QPS > single node capacity   |

Sample Code.

```sql
CREATE TABLE dictionary_word (
  word VARCHAR(255) PRIMARY KEY,
  meaning TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Spring Boot Dependencies - `spring-boot-starter-web`, `spring-boot-starter-data-jpa`, `postgresql`,
`spring-boot-starter-data-redis`

```pom
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

Entity and Repository.

```java

@Entity
@Table(name = "dictionary_word")
public class DictionaryWord {
    @Id
    private String word;

    @Column(columnDefinition = "TEXT")
    private String meaning;

    @Column
    private Timestamp createdAt;

    @Column
    private Timestamp updatedAt;

    // getters and setters
}

@Repository
public interface DictionaryWordRepository extends JpaRepository<DictionaryWord, String> {
}

```

Redis Configuration.

```java

@Configuration
public class RedisConfig {

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory();
    }

    @Bean
    public RedisTemplate<String, String> redisTemplate() {
        RedisTemplate<String, String> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory());
        return template;
    }
}
```

Service Layer.

```java

@Service
public class DictionaryService {

    @Autowired
    private DictionaryWordRepository repository;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public String getMeaning(String word) {
        String cachedMeaning = redisTemplate.opsForValue().get(word);
        if (cachedMeaning != null) {
            return cachedMeaning;
        }

        DictionaryWord wordEntity = repository.findById(word)
                .orElseThrow(() -> new RuntimeException("Word not found"));

        redisTemplate.opsForValue().set(word, wordEntity.getMeaning());
        return wordEntity.getMeaning();
    }

    @Transactional
    public void applyChangelog(List<DictionaryWord> newWords) {
        for (DictionaryWord w : newWords) {
            repository.save(w);
            redisTemplate.delete(w.getWord()); // clear cache
        }
    }
}
```

Controller.

```java

@RestController
@RequestMapping("/api")
public class DictionaryController {

    @Autowired
    private DictionaryService service;

    @GetMapping("/word/{word}")
    public ResponseEntity<String> getWord(@PathVariable String word) {
        return ResponseEntity.ok(service.getMeaning(word));
    }

    @PostMapping("/changelog")
    public ResponseEntity<String> uploadChangelog(@RequestBody List<DictionaryWord> changelog) {
        service.applyChangelog(changelog);
        return ResponseEntity.ok("Changelog applied");
    }
}
```

Application properties.

```properties
spring.datasource.url=jdbc:postgresql://${POSTGRES_HOST:localhost}:5432/dictionarydb
spring.datasource.username=${POSTGRES_USER:postgres}
spring.datasource.password=${POSTGRES_PASSWORD:password}
spring.redis.host=${REDIS_HOST:localhost}
spring.redis.port=6379
```

Docker Compose.

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - POSTGRES_HOST=postgres
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=example
      - REDIS_HOST=redis
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_DB: dictionarydb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: example
    ports:
      - "5432:5432"

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

Kubernetes Deployment.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dictionary-app
spec:
  replicas: 5
  selector:
    matchLabels:
      app: dictionary-app
  template:
    metadata:
      labels:
        app: dictionary-app
    spec:
      containers:
        - name: dictionary-container
          image: gcr.io/YOUR_PROJECT_ID/dictionary-app:latest
          ports:
            - containerPort: 8080
          env:
            - name: POSTGRES_HOST
              value: "YOUR_PG_HOST"
            - name: POSTGRES_USER
              value: "postgres"
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: pg-secret
                  key: password
            - name: REDIS_HOST
              value: "YOUR_REDIS_HOST"
---
apiVersion: v1
kind: Service
metadata:
  name: dictionary-service
spec:
  type: LoadBalancer
  selector:
    app: dictionary-app
  ports:
    - port: 80
      targetPort: 8080
```

Use Cloud SQL for managed PostgreSQL.

Use Cloud Memorystore for Redis.

Use GKE (Google Kubernetes Engine) for your pods.

Use Container Registry (gcr.io) for your Docker images.

Use Secrets Manager for DB credentials.

docker build -t gcr.io/YOUR_PROJECT_ID/dictionary-app:latest .

Docker push gcr.io/YOUR_PROJECT_ID/dictionary-app:latest
3️⃣ kubectl apply -f k8s-deployment.yaml
4️⃣ Setup Cloud SQL Proxy if needed.
5️⃣ Redis can be Cloud Memorystore, with redis.host = private IP.

5M requests/min → Redis covers hot reads, DB covers cold.
✅ Transactional changelog → Strong consistency.
✅ Stateless pods → scale horizontal in GKE.
✅ Kubernetes health checks → rolling deploys.
✅ Atomic upserts → no partial updates.
✅ Rollback? Just reapply previous changelog.

# LLD.

| Core Flow          | Operations                                                                             |
|--------------------|----------------------------------------------------------------------------------------|
| `GET /word/{word}` | 1) Validate input 2) Check Redis 3) If miss → DB 4) Populate Redis 5) Return           |
| `POST /changelog`  | 1) Validate file 2) Parse new words 3) Store in DB transactionally 4) Clear cache keys |

| Object               | Responsibility                       |
|----------------------|--------------------------------------|
| `Word`               | Domain entity: word + meaning.       |
| `DictionaryService`  | Business logic (lookups, changelog). |
| `WordRepository`     | DB operations (CRUD).                |
| `CacheService`       | Redis abstraction.                   |
| `ChangelogProcessor` | Parses & validates changelog.        |
| `WordValidator`      | Ensures valid input.                 |
| `Controller`         | Exposes REST API.                    |

| **SOLID** Principle           | Where Applied                                                                                           | Real Pattern Used                           | Why It Fits                                               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------- | --------------------------------------------------------- |
| **S** — Single Responsibility | `WordRepository` → DB only <br> `RedisCacheService` → Cache only <br> `WordValidator` → Validation only | **Repository**, **Proxy/Decorator**         | Each class does *one* clear job                           |
| **O** — Open/Closed           | New file formats → plug `CSVProcessor`, `JSONProcessor`                                                 | **Factory**                                 | Add new processor without changing core logic             |
| **L** — Liskov Substitution   | `IWordRepository` <br> `ICacheService`                                                                  | **Repository**, **Strategy**                | Replace `WordRepository` with any storage backend         |
| **I** — Interface Segregation | `ICacheService`, `IWordRepository`, `IChangelogProcessor`                                               | **Repository**, **Factory**                 | Interfaces expose only needed ops                         |
| **D** — Dependency Inversion  | `Controller` depends on `IDictionaryService` <br> `DictionaryService` depends on interfaces             | **Repository**, **Strategy**, **Decorator** | High-level modules use abstractions, not concrete classes |

SOLID shapes the structure.

Patterns implement the shape.

| Pattern        | Where Used                                 | Why                                               |
| -------------- | ------------------------------------------ | ------------------------------------------------- |
| **Repository** | `WordRepository`                           | Abstract DB.                                      |
| **Factory**    | `ChangelogProcessorFactory`                | Can create `JSONProcessor`, `CSVProcessor` later. |
| **Strategy**   | Cache lookup strategy (`ReadThroughCache`) | Swappable cache policy.                           |
| **Singleton**  | `RedisConnection`                          | One Redis pool.                                   |
| **Builder**    | `Word` for complex JSON payloads.          | Future synonyms/examples.                         |

```pgsql
+---------------------+
|      Controller     |
+---------------------+
| - IDictionaryService|
+---------------------+
| + getWord()         |
| + uploadChangelog() |
+---------------------+

          |
          v

+------------------------+
|  IDictionaryService    |
+------------------------+
| + getMeaning()         |
| + applyChangelog()     |
+------------------------+

          |
          v

+------------------------+
|  DictionaryService     |
+------------------------+
| - WordRepository       |
| - CacheService         |
| - ChangelogProcessor   |
+------------------------+
| + getMeaning()         |
| + applyChangelog()     |
+------------------------+

 +---------------+         +----------------+
 | WordValidator |         | ChangelogProcessorFactory |
 +---------------+         +----------------+
 | + isValid()   |         | + getProcessor() |
 +---------------+         +----------------+

 +---------------------+
 | IWordRepository     |
 +---------------------+
 | + findWord()        |
 | + saveWord()        |
 +---------------------+

         |
         v

 +---------------------+
 | WordRepository      |
 +---------------------+
 | - DB Connection     |
 +---------------------+
 | + findWord()        |
 | + saveWord()        |
 +---------------------+

 +---------------------+
 | ICacheService       |
 +---------------------+
 | + get()             |
 | + set()             |
 | + evict()           |
 +---------------------+

         |
         v

 +---------------------+
 | RedisCacheService   |
 +---------------------+
 | - RedisConnection   |
 +---------------------+
 | + get()             |
 | + set()             |
 | + evict()           |
 +---------------------+

 +---------+
 | Word    |
 +---------+
 | word    |
 | meaning |
 +---------+
```

Word — Builder Pattern.
```java
public class Word {
    private final String word;
    private final String meaning;

    private Word(Builder builder) {
        this.word = builder.word;
        this.meaning = builder.meaning;
    }

    public String getWord() { return word; }
    public String getMeaning() { return meaning; }

    public static class Builder {
        private String word;
        private String meaning;

        public Builder word(String word) {
            this.word = word;
            return this;
        }

        public Builder meaning(String meaning) {
            this.meaning = meaning;
            return this;
        }

        public Word build() {
            return new Word(this);
        }
    }
}

```

```java
public interface IWordRepository {
    Optional<Word> findWord(String word);
    void saveWords(List<Word> words);
}

@Repository
public class WordRepository implements IWordRepository {
    // Spring Data JPA or JdbcTemplate
    public Optional<Word> findWord(String word) {
        // SELECT * FROM dictionary WHERE word = ?
        return Optional.empty(); // example
    }

    public void saveWords(List<Word> words) {
        // Transactional batch UPSERT
    }
}

```
Proxy/Decorator Pattern for Cache
```java
public interface ICacheService {
    String get(String key);
    void set(String key, String value);
    void evict(String key);
}

@Service
public class RedisCacheService implements ICacheService {
    private final RedisTemplate<String, String> redis;

    public RedisCacheService(RedisTemplate<String, String> redis) {
        this.redis = redis;
    }

    public String get(String key) {
        return redis.opsForValue().get(key);
    }

    public void set(String key, String value) {
        redis.opsForValue().set(key, value);
    }

    public void evict(String key) {
        redis.delete(key);
    }
}

```
Factory Pattern for Changelog Processor.
```java
public interface IChangelogProcessor {
    List<Word> parseChangelog(File file);
}

public class JSONProcessor implements IChangelogProcessor {
    public List<Word> parseChangelog(File file) {
        // Parse JSON changelog
        return List.of();
    }
}

public class CSVProcessor implements IChangelogProcessor {
    public List<Word> parseChangelog(File file) {
        // Parse CSV changelog
        return List.of();
    }
}

public class ChangelogProcessorFactory {
    public static IChangelogProcessor getProcessor(String fileType) {
        switch(fileType) {
            case "json": return new JSONProcessor();
            case "csv": return new CSVProcessor();
            default: throw new IllegalArgumentException("Unsupported file type");
        }
    }
}
```
Strategy Pattern (Optional) for Cache Strategy.
```java
public interface CacheStrategy {
    String get(String key);
    void put(String key, String value);
}

public class ReadThroughCacheStrategy implements CacheStrategy {
    private final ICacheService cache;
    private final IWordRepository repository;

    public ReadThroughCacheStrategy(ICacheService cache, IWordRepository repository) {
        this.cache = cache;
        this.repository = repository;
    }

    public String get(String key) {
        String cached = cache.get(key);
        if (cached != null) return cached;

        Optional<Word> word = repository.findWord(key);
        word.ifPresent(w -> cache.set(key, w.getMeaning()));
        return word.map(Word::getMeaning).orElse(null);
    }

    public void put(String key, String value) {
        cache.set(key, value);
    }
}
```
Dictionary Service with Dependency Inversion
```java
public interface IDictionaryService {
    String getMeaning(String word);
    void applyChangelog(File file, String fileType);
}

@Service
public class DictionaryService implements IDictionaryService {
    private final IWordRepository repo;
    private final ICacheService cache;

    public DictionaryService(IWordRepository repo, ICacheService cache) {
        this.repo = repo;
        this.cache = cache;
    }

    public String getMeaning(String word) {
        String cached = cache.get(word);
        if (cached != null) return cached;

        Word w = repo.findWord(word)
                     .orElseThrow(() -> new RuntimeException("Word not found"));
        cache.set(word, w.getMeaning());
        return w.getMeaning();
    }

    public void applyChangelog(File file, String fileType) {
        IChangelogProcessor processor = ChangelogProcessorFactory.getProcessor(fileType);
        List<Word> words = processor.parseChangelog(file);
        repo.saveWords(words);
        words.forEach(w -> cache.evict(w.getWord()));
    }
}
```

Controller.
```java
public interface IDictionaryService {
    String getMeaning(String word);
    void applyChangelog(File file, String fileType);
}

@Service
public class DictionaryService implements IDictionaryService {
    private final IWordRepository repo;
    private final ICacheService cache;

    public DictionaryService(IWordRepository repo, ICacheService cache) {
        this.repo = repo;
        this.cache = cache;
    }

    public String getMeaning(String word) {
        String cached = cache.get(word);
        if (cached != null) return cached;

        Word w = repo.findWord(word)
                     .orElseThrow(() -> new RuntimeException("Word not found"));
        cache.set(word, w.getMeaning());
        return w.getMeaning();
    }

    public void applyChangelog(File file, String fileType) {
        IChangelogProcessor processor = ChangelogProcessorFactory.getProcessor(fileType);
        List<Word> words = processor.parseChangelog(file);
        repo.saveWords(words);
        words.forEach(w -> cache.evict(w.getWord()));
    }
}
```


S: Repo, Cache, Processor each do one job
O: Adding XMLProcessor? Zero changes to DictionaryService
L: Any IWordRepository works — Postgres, DynamoDB
I: Interfaces cleanly split responsibilities
D: Controller depends on IDictionaryService only — low coupling

✔️ Repository → DB
✔️ Proxy → Redis Cache
✔️ Factory → Changelog Processor
✔️ Strategy → Pluggable cache logic
✔️ Builder → Word object
✔️ Singleton → Spring handles Redis pool
✔️ Decorator → You can wrap IWordRepository for logging / metrics easily

@Transactional in saveWords ensures atomic changelog.

Rollback on exception.

Cache evicts after commit to avoid stale reads.


Sample test file will be like this.
```java
@ExtendWith(MockitoExtension.class)
class DictionaryServiceTest {

    @Mock
    private IWordRepository repo;

    @Mock
    private ICacheService cache;

    @InjectMocks
    private DictionaryService service;

    @Test
    void testGetMeaning_CacheHit() {
        when(cache.get("apple")).thenReturn("A fruit");

        String result = service.getMeaning("apple");

        assertEquals("A fruit", result);
        verifyNoInteractions(repo);
    }

    @Test
    void testGetMeaning_CacheMiss_DBHit() {
        when(cache.get("banana")).thenReturn(null);
        when(repo.findWord("banana")).thenReturn(Optional.of(
            new Word.Builder().word("banana").meaning("Yellow fruit").build()
        ));

        String result = service.getMeaning("banana");

        assertEquals("Yellow fruit", result);
        verify(cache).set("banana", "Yellow fruit");
    }

    @Test
    void testGetMeaning_NotFound() {
        when(cache.get("kiwi")).thenReturn(null);
        when(repo.findWord("kiwi")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> service.getMeaning("kiwi"));
    }

    @Test
    void testApplyChangelog_ProcessorAndRepo() {
        // Mock changelog file and processor
        File dummyFile = new File("dummy.json");
        IChangelogProcessor mockProcessor = mock(IChangelogProcessor.class);
        List<Word> mockWords = List.of(
            new Word.Builder().word("pear").meaning("Juicy fruit").build()
        );
        when(mockProcessor.parseChangelog(dummyFile)).thenReturn(mockWords);

        // Replace factory for test
        try (MockedStatic<ChangelogProcessorFactory> mockedFactory = 
                mockStatic(ChangelogProcessorFactory.class)) {
            mockedFactory.when(() -> ChangelogProcessorFactory.getProcessor("json"))
                    .thenReturn(mockProcessor);

            service.applyChangelog(dummyFile, "json");

            verify(repo).saveWords(mockWords);
            verify(cache).evict("pear");
        }
    }
}
```
Basic Docker Compose to run:

Spring Boot App

Redis

PostgreSQL
```yaml
version: "3.8"

services:
  dictionary-app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/dictionary
      - SPRING_DATASOURCE_USERNAME=postgres
      - SPRING_DATASOURCE_PASSWORD=postgres
      - SPRING_REDIS_HOST=redis
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: dictionary
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7
    restart: always
    ports:
      - "6379:6379"

volumes:
  pgdata:
```
Here’s a starter GKE-ready deployment.yaml for the Spring Boot app.
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dictionary-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: dictionary-service
  template:
    metadata:
      labels:
        app: dictionary-service
    spec:
      containers:
      - name: dictionary-app
        image: gcr.io/YOUR_PROJECT_ID/dictionary-app:latest
        ports:
        - containerPort: 8080
        env:
        - name: SPRING_DATASOURCE_URL
          value: jdbc:postgresql://POSTGRES_HOST:5432/dictionary
        - name: SPRING_DATASOURCE_USERNAME
          value: postgres
        - name: SPRING_DATASOURCE_PASSWORD
          value: postgres
        - name: SPRING_REDIS_HOST
          value: REDIS_HOST
---
apiVersion: v1
kind: Service
metadata:
  name: dictionary-service
spec:
  selector:
    app: dictionary-service
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: LoadBalancer
```

A production-ready Dockerfile for your Spring Boot JAR
✅ A Helm chart starter for GKE
✅ A basic GitHub Actions workflow to build, push to Google Container Registry (GCR), and deploy to GKE automatically.

This Dockerfile builds your Spring Boot JAR and runs it with OpenJDK 17.
```dockerfile
# Use a minimal builder image
FROM eclipse-temurin:17-jdk as build

WORKDIR /app

# Copy Maven files and download dependencies first (layer caching)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
RUN ./mvnw dependency:go-offline

# Copy source and build
COPY src src
RUN ./mvnw package -DskipTests

# ===========================
# Use a slim base image
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

```
Best Practice:

Multi-stage build keeps image small.

No Maven runtime in final image.

Runs with minimal JVM footprint.

Helm Chart Starter
Helm makes it easy to template values for staging/prod.
Here’s the folder structure and basic chart files.
`helm/dictionary/Chart.yaml`
```yaml
apiVersion: v2
name: dictionary
description: A Helm chart for the Dictionary Service
type: application
version: 0.1.0
appVersion: "1.0"
```

helm/dictionary/values.yaml
```yaml
replicaCount: 3

image:
  repository: gcr.io/YOUR_PROJECT_ID/dictionary-app
  tag: latest
  pullPolicy: IfNotPresent

service:
  type: LoadBalancer
  port: 80

env:
  SPRING_DATASOURCE_URL: jdbc:postgresql://<POSTGRES_HOST>:5432/dictionary
  SPRING_DATASOURCE_USERNAME: postgres
  SPRING_DATASOURCE_PASSWORD: postgres
  SPRING_REDIS_HOST: <REDIS_HOST>

```

`helm/dictionary/templates/deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-deployment
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: {{ .Release.Name }}
  template:
    metadata:
      labels:
        app: {{ .Release.Name }}
    spec:
      containers:
      - name: {{ .Release.Name }}
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
        imagePullPolicy: {{ .Values.image.pullPolicy }}
        ports:
        - containerPort: 8080
        env:
        - name: SPRING_DATASOURCE_URL
          value: "{{ .Values.env.SPRING_DATASOURCE_URL }}"
        - name: SPRING_DATASOURCE_USERNAME
          value: "{{ .Values.env.SPRING_DATASOURCE_USERNAME }}"
        - name: SPRING_DATASOURCE_PASSWORD
          value: "{{ .Values.env.SPRING_DATASOURCE_PASSWORD }}"
        - name: SPRING_REDIS_HOST
          value: "{{ .Values.env.SPRING_REDIS_HOST }}"

```
`helm/dictionary/templates/service.yaml`
```yaml
apiVersion: v1
kind: Service
metadata:
  name: {{ .Release.Name }}-service
spec:
  type: {{ .Values.service.type }}
  selector:
    app: {{ .Release.Name }}
  ports:
    - protocol: TCP
      port: {{ .Values.service.port }}
      targetPort: 8080

```

Now deploy `helm install dictionary ./helm/dictionary`

GitHub Actions Workflow
Here’s a simple `.github/workflows/deploy.yml` - 

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up JDK
      uses: actions/setup-java@v3
      with:
        distribution: 'temurin'
        java-version: '17'

    - name: Build JAR
      run: ./mvnw package -DskipTests

    - name: Set up Docker
      uses: docker/setup-buildx-action@v3

    - name: Authenticate to GCP
      uses: google-github-actions/auth@v2
      with:
        credentials_json: ${{ secrets.GCP_SA_KEY }}

    - name: Configure Docker to use gcloud
      run: gcloud auth configure-docker

    - name: Build & push Docker image
      run: |
        docker build -t gcr.io/$GCP_PROJECT_ID/dictionary-app:latest .
        docker push gcr.io/$GCP_PROJECT_ID/dictionary-app:latest
      env:
        GCP_PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}

    - name: Set up kubectl
      uses: azure/setup-kubectl@v3

    - name: Set up Helm
      uses: azure/setup-helm@v3

    - name: Deploy with Helm
      run: |
        helm upgrade --install dictionary ./helm/dictionary \
          --set image.repository=gcr.io/$GCP_PROJECT_ID/dictionary-app \
          --set image.tag=latest
      env:
        GCP_PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}
```

Secrets needed:

GCP_SA_KEY → Service Account JSON Key (base64 encoded).

GCP_PROJECT_ID → Your GCP Project ID.

What You Now Have
✔️ Spring Boot LLD + SOLID + Design Patterns
✔️ Real unit tests
✔️ Docker build & Compose
✔️ Helm chart starter
✔️ GitHub Actions to auto build & deploy.


✅ 1️⃣ Terraform setup to provision GCP infra:

GKE cluster

Cloud SQL instance (PostgreSQL)

Memorystore (Redis)

IAM service account for GitHub Actions

✅ 2️⃣ Kubernetes Secrets for credentials (best practice)

✅ 3️⃣ Prometheus + Grafana add-on for live monitoring.

Below is a clean main.tf snippet.
Organize into.
```css
infra/
 ├── main.tf
 ├── variables.tf
 ├── outputs.tf
 ├── versions.tf

```

version.tf
```hcl
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.3"
}

provider "google" {
  project = var.project_id
  region  = var.region
}

```

`main.tf`
```hcl
# GKE Cluster
resource "google_container_cluster" "primary" {
  name     = var.gke_cluster_name
  location = var.region

  remove_default_node_pool = true

  initial_node_count = 1
}

resource "google_container_node_pool" "primary_nodes" {
  name       = "primary-node-pool"
  location   = var.region
  cluster    = google_container_cluster.primary.name

  node_config {
    machine_type = "e2-medium"
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
    ]
  }

  initial_node_count = 3
}

# Cloud SQL (Postgres)
resource "google_sql_database_instance" "postgres" {
  name             = var.db_instance_name
  database_version = "POSTGRES_15"
  region           = var.region

  settings {
    tier = "db-f1-micro"
    backup_configuration {
      enabled = true
    }
  }
}

resource "google_sql_user" "postgres_user" {
  name     = "postgres"
  instance = google_sql_database_instance.postgres.name
  password = "change-me-strong"
}

# Memorystore (Redis)
resource "google_redis_instance" "redis" {
  name           = var.redis_instance_name
  tier           = "STANDARD_HA"
  memory_size_gb = 1
  region         = var.region
}
```


`output.tf`
```hcl
output "gke_endpoint" {
  value = google_container_cluster.primary.endpoint
}

output "db_instance_connection_name" {
  value = google_sql_database_instance.postgres.connection_name
}

output "redis_host" {
  value = google_redis_instance.redis.host
}

output "redis_port" {
  value = google_redis_instance.redis.port
}

```

How to deploy.
```
cd infra
terraform init
terraform plan -out tfplan
terraform apply tfplan
```
Save the output connection strings for your Helm chart’s values.yaml.

Kubernetes Secrets
Store DB credentials, Redis credentials, API keys — never plain env.

secret.yaml

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: dictionary-secrets
type: Opaque
data:
  POSTGRES_USER: cG9zdGdyZXM= # base64(postgres)
  POSTGRES_PASSWORD: Y2hhbmdlLW1lLXN0cm9uZw== # base64(change-me-strong)
  REDIS_HOST: cmVkaXMuaG9zdA== # base64(your Redis host)

```

Reference them in Helm -
```yaml

env:
  - name: SPRING_DATASOURCE_USERNAME
    valueFrom:
      secretKeyRef:
        name: dictionary-secrets
        key: POSTGRES_USER
```

Use `kubectl create secret` or manage via Helm.

Prometheus + Grafana
Add to Helm or use the community chart - 
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

helm install prometheus prometheus-community/prometheus
helm install grafana grafana/grafana
```

Your Spring Boot app exposes /actuator/prometheus? Add spring-boot-starter-actuator + micrometer.

```yaml
management:
  endpoints:
    web:
      exposure:
        include: prometheus
```
| Piece         | What You Have                               |
| ------------- | ------------------------------------------- |
| LLD           | SOLID + patterns                            |
| Code          | Service + Repo + Cache + Factory + Strategy |
| Tests         | JUnit + Mockito                             |
| CI/CD         | GitHub Actions → GCR → GKE                  |
| Infra         | Terraform → GKE, Cloud SQL, Redis           |
| Secrets       | K8s Secret YAML                             |
| Observability | Prometheus + Grafana                        |

“This system is 12-Factor, microservices ready, observable, secrets-managed, and fully automatable through GitOps — a real-world design for high QPS, low-latency lookups and easy changelog updates.”
