+++
title = 'Important Topic Project'
date = 2024-02-22T22:26:11+05:30
tags=['spring','database','jdbc']
+++


PUT is idempotent: calling it once or several times successively has the same effect (that is no side effect), whereas successive identical POST requests may have additional effects.

PUT is restricted to create or update operations, while a POST operation may perform any type of processing.

PUT request creates a resource the server will respond with a 201 ( Created )



In the application.yml file we need to add the username and password and the db name and schema.
```java
spring.datasource.url = jdbc:postgresql://localhost:5432/chinook?currentSchema=cmc
spring.datasource.username = dbuser
spring.datasource.password = a

spring.jpa.show-sql = true
spring.jpa.hibernate.ddl-auto = update
```

In postgress we have to create the db say `chinook` generally the table is created in the public schema. We need to create the schema, then open the sql editor and run the code. 

In the datasource.url we need to pass the schema as well. The syntax is `jdbc:postgresql://localhost:5432/chinook?currentSchema=cmc`
- We need to create another user for the db as the default is postgres. If some other user wants o login then they need to have some login username and password. Here we have the dbuser and password is a.

---

When using the SQL file in the resource for the create and insert there should be one data.sql and one schema.sql and it should be done using the Hibernate and JDBC. 
- Not used anymore.
- JPA uses the JDBC and Hibernate inside.
- We use JDBC when there is no SQL developer and entire SQL is written inside the Spring. 
- If one sql is error then the entire software will be down.
- Everytime when the server will run it will create a new db and the data will not be stored.


In the project we run the db file in the Postgress and with JPA we made the model and repository and the services.

- Say for Album table we need to make the album class like the model as many times we need to send the list of album that needs to be a class.

```java
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="album")
public class Album {
    @Id
    private Integer albumid;
    private String title;
    private Integer artistid;
}
```

- All the import is from `jakarta.persistence`.
- In the SQL editor the table name was with capital letter `Album` but in the db it is shown as `album`. The final table name should be the one that is shown in the db. `@Table(name="album")`.
- We need to add the `@Id`.
- When search for directly by say albumid we can use the `findByalbumid` with the proper column name.
```java
@Service
public class AlbumServices {
    @Autowired
    private AlbumRepository albumRepository;

    public List<Album> getArtistByArtistId(Integer id) {
        return albumRepository.findByalbumid(id);
    }
}
```
- The `findByalbumid` should be already there in the `albumRepository`
- When we need to find the data from the two table with join then we need to write the SQL query so we write that in a separate file inside the resource package.

```java
@Query(nativeQuery = true, value = "classpath:queries.sql")
List<Student> findByDepartmentName(@Param("departmentName") String departmentName);
```
- The file path `classpath:queries.sql` should be given.
---
File structure not based on the tables. 
- All controllers should be inside the controller package and so on.
- We donot make package based on the table name.
  
When we do findAll() or findById() then we need to have the same method in repository.
```java
// In service.
public List<Playlist> getAllPlaylist() {
        return playlistRepository.findAll();
}
```
- The `findAll` should be the method name in repository as we are calling the method by `playlistRepository`.

Also in the get we need to pass the id in the url and we need to get hat by the `@Pathvariable`.

- The `findAll` need to checked while using in the services. As when ctrl and click on findAll then it opened in different file and not in repository. So cross-check if the repository method is getting called.

---

Making one `application-dev.properties` file so we need to create a new file.
- In application.properties file we need to add `spring.profiles.active = dev`
- In the dev file we can add the code.
```java
spring.datasource.url = jdbc:postgresql://localhost:5432/chinook?currentSchema=cmc
spring.datasource.username = dbuser
spring.datasource.password = a

spring.jpa.show-sql = true
spring.jpa.hibernate.ddl-auto = update
```



---

4 post
4 put
3 delete
1 patch
