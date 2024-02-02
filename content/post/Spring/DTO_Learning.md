+++
title = 'DTO Learning'
date = 2024-02-02T13:06:19+05:30
tags=["spring","mongodb","CRUD","REST"]
+++


# DTO Data Transfer Object.
Most widely used design pattern to transfer the data between client and the server.

- Client sends the DTO object and it will send the DTO object in the HTTP request and the server will extract the object from the request and use the DTO object.
- Server will create the DTO object and the server will send the DTO object in the response of the REST API.

The main use of using DTO is to reduce the remote calls.
- In `Employee Management System` say there is Organization, Departments and the Employee.
- There is rest api to give the list of department and list of employee.
- Client needs to make call to get the Department and Employee details. Then they need to call separately.
- We can create a single rest api and that return the details of the department and employee.
- Say we have 2 classes to hold the data of dept and employee. There is one more class `APIResponseDTO` class we can create a list of Department and list of employee.

- Then will create a rest api to return the response DTO to the client.
- We can create a DTO to get the details of the department and the employee and send to the client.
- Server can send only the required data to the client. It does not send the entity or the domin object.

Controller then Service then Repository or DAO to talk to the database.

The JPA entities that talks directly to the relational tables.

Naive - Create the rest Api and return the JPA directly to the client. With DTO we can only send the required data to the client.

We need Model mapper MapStruct to map dto to entity and entity to dto.

Spring initializer project.
- Dependencies Web(Rest services), lombok, JPA, H2.

We need to create a package like services, controller, repository, model, dto.

User class in model. define the field in the class, add the `@Data` annotation.
Make the class a JPA entity by the `@Entity` and `@Table` annotation.

- For the firstName and lastName we need to have the column name. `@Column(name = "first_name")`
- When we do not provide the annotation then JPA gets the column name as the field name.



The User class is like.
```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String email;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String password;
}
```

Will create one more JPA entity in the model and perform Many to One relationship.

Another Location class.
```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "locations")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String place;
    private String description;
    private double longitude;
    private double latitude;
}

```

- This is the many to one relation. So in User class.
```java
@ManyToOne(fetch = FetchType.EAGER,optional = false)
    @JoinColumn(name = "location_id")
    private Location location;
```

### Repository.
In the repository we will create a `UserRepository` and `LocationRepository` interface.

- We can do the CRUD operation for the entities to interact with the database.

We donot need to write any code for the interface as default spring provide the implementation.

The interface looks like.
```java
public interface UserRepository extends JpaRepository<User,long> {
}
```
```java
public interface LocationRepository extends JpaRepository<Location,long> {
}
```

- We need to create the DTO class.
- We will write the Rest APi that returns the user and the location details to the client.
- `UserLocationDto` create the clients to send the detail. User Information and the Location Information.

- When we do the mapping for the entity and the dto, we need to have the same fields name.

- In the `UserLocationDto` class.

```java
public class UserLocationDto {
    private long userId;
    private String email;

    private String place;
    private double longitude;
    private double latitude;
}
```
- In place of adding the getter and setter we can add the annotation @Data.

### Service
- Service annotation.
- Inject the userRepository.
- One method to return the details.
```java
public List<UserLocationDto> getAllUsersLocation(){
        
}   
```
- One private method to convert userEntity to UserLocationDto. The parameter is `UserEntity`

```java

private UserLocationDto convertEntityToDto(User user){
        // Create an object of UserLocationDto and set all the details from entity to the DTO.
        UserLocationDto userLocationDto = new UserLocationDto();
        userLocationDto.setUserId(user.getId());
        userLocationDto.setEmail(user.getEmail());
        userLocationDto.setPlace(user.getLocation().getPlace());
        userLocationDto.setLatitude(user.getLocation().getLatitude());
        userLocationDto.setLongitude(user.getLocation().getLongitude());
        return userLocationDto;
    }

```

- Converted the USer entity to the UserLocationDto.

`userLocationDto.setPlace(user.getLocation().getPlace());`
In the User class we did the mapping so will get the location details through the User and the mapping.

- In the public method
  findAll to return the list of user.
- The map will call the list of user and it will call the method.
```java
public List<UserLocationDto> getAllUsersLocation(){
        return userRepository.findAll()
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }
```

### Controller
- @RestController and the autowire of the service.

```java
@Autowired
    private UserService userService;

    @GetMapping("/users-location")
    public List<UserLocationDto> getAllUserLocation(){
        return userService.getAllUsersLocation();
    }
    
```

### Create the data.
- In the main class we need to implements `CommandLineRunner`
  and autowire the repository.

- We need to implements the method run.

- Need to create the new object of the model.

```java
@SpringBootApplication
public class DtoLearningApplication implements CommandLineRunner {

	public static void main(String[] args) {

		SpringApplication.run(DtoLearningApplication.class, args);
	}
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private LocationRepository locationRepository;

	@Override
	public void run(String args[]) throws Exception{
		Location location = new Location();
		location.setPlace("Kolkata");
		location.setDescription("Kolkata is rich in culture.");
		location.setLongitude(49.9);
		location.setLatitude(89.9);
		locationRepository.save(location);

		User user1 = new User();
		user1.setEmail("abc@gmail.com");
		user1.setFirstName("Brad");
		user1.setLastName("Trevor");
		user1.setPassword("abc123");
		user1.setLocation(location);
		userRepository.save(user1);

		User user2 = new User();
		user2.setEmail("abc1@gmail.com");
		user2.setFirstName("John");
		user2.setLastName("Trevor");
		user2.setPassword("abc123");
		user2.setLocation(location);
		userRepository.save(user2);
	}

}
```

In the browser we got the output
```java
[{"userId":1,"email":"abc@gmail.com","place":"Kolkata","longitude":49.9,"latitude":89.9},
{"userId":2,"email":"abc1@gmail.com","place":"Kolkata","longitude":49.9,"latitude":89.9}]
```
- All the data was added and the client will only see the required data.

- In the servcie class we have manually convert the User to the DTO we can also use the mapper.
- If the application has many JPA and DTO then we need to use the modelmapper.

- We need to add the dependencies model mapper maven library in the pom xml.


- We need to use the model mapper as a bean.


>>> Issue faced the ID annotation class is `import jakarta.persistence.*`