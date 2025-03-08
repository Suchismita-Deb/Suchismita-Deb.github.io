+++
title = 'ImportantLearning'
date = 2024-02-24T01:06:20+05:30

tags=['spring']
+++


With `@RestController` we donot need to add the `ResponseBody`. With the `@Controller` we have to add the `@ResponseBody`


### Swagger.
To make the swagger work there can update the main class file woth beans to customise the url.

```java
@Value("${dva.cwow.swagger.centralized-url}")
    public String swagger;

    @Bean
    public OpenAPI openAPI(ServletContext servletContext) {
        Server server = new Server().url(swagger);
        return new OpenAPI().servers(List.of(server));
    }

    @Bean
    public GlobalOpenApiCustomizer customizer() {
        return openApi -> openApi.getPaths().values().stream()
                .flatMap(pathItem -> pathItem.readOperations().stream())
                .forEach(operation -> operation.addParametersItem(new HeaderParameter().name("facilityId").
                                in(ParameterIn.HEADER.toString())
                                .schema(new Schema<>().type("[e.g UUID]"))).addParametersItem(new HeaderParameter().name("correlationId").
                                in(ParameterIn.HEADER.toString())
                                .schema(new Schema<>().type("[e.g String]"))).addParametersItem(new HeaderParameter().name("facilityUUID").
                                in(ParameterIn.HEADER.toString())
                                .schema(new Schema<>().type("[e.g String]")))
                        .addParametersItem(new HeaderParameter().name("userName").
                                in(ParameterIn.HEADER.toString())
                                .schema(new Schema<>().type("[e.g String]")))
                        .addParametersItem(new HeaderParameter().name("userRoles").
                                in(ParameterIn.HEADER.toString())
                                .schema(new Schema<>().type("[e.g String]")))
                        .addParametersItem(new HeaderParameter().name("authorization").
                                in(ParameterIn.HEADER.toString())
                                .schema(new Schema<>().type("[e.g String]")))
                        .addParametersItem(new HeaderParameter().name("accessToken").
                                in(ParameterIn.HEADER.toString())
                                .schema(new Schema<>().type("[e.g String]")))
                        .addParametersItem(new HeaderParameter().name("userFirstName").in(ParameterIn.HEADER.toString())
                                .schema(new Schema<>().type("[e.g String]")))
                        .addParametersItem(new HeaderParameter().name("userLastName").
                                in(ParameterIn.HEADER.toString())
                                .schema(new Schema<>().type("[e.g String]")))
                        .addParametersItem(new HeaderParameter().name("userSummary").
                                in(ParameterIn.HEADER.toString())
                                .schema(new Schema<>().type("[e.g String]")))
                        .addParametersItem(new HeaderParameter().name("masterPatientIdentifier").
                                in(ParameterIn.HEADER.toString())
                                .schema(new Schema<>().type("[e.g String]"))));
        //will be: string($uuid)                .required(true)));}
    }

// GlobalOpenApiCustomizer  will customize the url.
```

Url `http://localhost:8080/webjars/swagger-ui/index.html`