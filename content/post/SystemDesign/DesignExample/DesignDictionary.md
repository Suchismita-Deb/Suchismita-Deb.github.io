+++
title = 'DesignDictionary'
date = 2025-07-02T00:40:28+05:30
url = "/post/systemdesign/designexample/DesignDictionary"
tags = ['interview question', 'system design']
categories = ['low level design', 'system design', 'high level design']
+++

### **Design a service that serves English Word Dictionary.**

The service exposes endpoints for getting the meaning given the word. The dictionary is weekly updated through a
changelog which has the words and meanings that needs to be updated and this changelog will contain at max 1000 words.
The total size of the dictionary is 1TB and it holds 171476 words.

No traditional db.

5M request per minute.  ~83,333 QPS

Weekly the data update at max 1000 word. Maintains strong consistency for lookups after each changelog.

**Additional Requirement** -
We look into the product vision as well.

Sub-ms lookups for common words.  
99.999% read availability.  
Full rollback if a bad changelog is pushed.  
Versioned storage for audit & compliance.  
Stateless deploys with rolling updates.  
Easy to maintain, small operational footprint.

**Large data size vs small word count -** 1TB for 171K words means each word + meaning is ~6MB on average — likely due
to detailed meanings, usage examples, synonyms, antonyms, etc.

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


| Component          | Role                                                              |
| ------------------ | ----------------------------------------------------------------- |
| 🚪 API Nodes       | Stateless REST servers.                                           |
| 🗂️ Local Index    | RocksDB or LMDB, local-only.                                      |
| ☁️ Blob Store      | S3 (immutable).                                                   |
| 🧊 CDN             | Cache blobs at edge.                                              |
| ⚡ In-memory Cache  | Local LRU + optional Redis Cluster.                               |
| 📦 Changelog Job   | Validates, builds new blobs, new index, swaps pointer.            |
| 🧩 Version Pointer | Tiny file in S3 or etcd.                                          |
| 🔄 Config Sync     | Each node pulls version pointer on boot & refreshes every minute. |


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
{"word": "serendipity", "meaning": "... new meaning ..."},
{"word": "effervescent", "meaning": "... new word ..."}
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
| --------------------- | -------------------------------------------- |
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
| ------------------------------ | ---------------------------------------- |
| Immutable files, RocksDB index | Normal relational DB table               |
| Pointer swap for versioning    | Schema versioning, transactional updates |
| Read path must slice files     | DB handles read, cache holds hot words   |
| Rollback = pointer flip        | Rollback = transaction + version flag    |
| Local index for speed          | DB handles index + query plan            |
| CDN only for blob files        | CDN optional (or used for static docs)   |

The data Model.
A relational table - dictionary_word - 

| Column       | Type         | Notes                   |
| ------------ | ------------ | ----------------------- |
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
| -------------- | ----------------------------------------------------- |
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
| --------- | --------------------------------------------------- |
| DB        | More expensive than pure blob store but simpler ops |
| Redis     | Adds infra, but worth it for hot reads              |
| API nodes | Scale linearly                                      |
| Changelog | Cheap batch job                                     |

| Factor           | Plan                                         |
| ---------------- | -------------------------------------------- |
| DB IOPS          | Sized for 0.1% read misses → 1K–2K QPS to DB |
| Redis RAM        | Sized for top \~50K words fully cached       |
| Write throughput | 1K row upsert per week — trivial             |
| Read replicas    | Add replicas if QPS > single node capacity   |
