+++
title = 'Content'
date = 2024-11-04T00:29:31+05:30
tags = ['Behavoiral Interview', 'Leadership Interview', "Client Behavoiral Interview", "Communication Behavoiral Interview",
    "Communication Behavoiral Interview", "ConflictResolution", "Customer Behavoiral Interview", "Decision Making Behavoiral Interview", "Experience Based Behavoiral Interview", "Grokking the Behavioral Interview", "Hypothetical Behavioral Interview", "Imaginary Behavoiral Interview", "STAR", "Team Work Behavoiral Interview", "Time Management Behavoiral Interview", "computer networks", 'interviewQuestion', 'java', 'functional interface', 'interface', 'lambda', 'work', 'MERN', "spring", "docker", "redis", 'Spring Security', "mongodb", "CRUD", "REST", 'database', 'jdbc', "springBootCourse", 'Stock', 'Stock Market', 'interview question', 'system design', "testing", 'git', 'blog',"vocabulary","gre", "observation"]
+++

# Content.


Part 1.
{{<youtube DJ2u7gjSl90>}}

Part 1.
{{<youtube rbjxmlYP19k>}}

Part 1.
{{<youtube GNdGJQIiVGs>}}

Part 1.
{{<youtube je_VAPptMzA>}}

Part 1.
{{<youtube gwLnrAY_Udo>}}

Part 1.
{{<youtube RxWzGyKpm3I>}}

Part 1.
{{<youtube fMBeFDdBxKI>}}

Part 1.
{{<youtube CcUGJ2RCP64>}}

New Playlist.

Part 1.
{{<youtube VZ3T2gFlEiA>}}

Part 1.
{{<youtube eat5LAwb6AI>}}

Part 1.
{{<youtube Q689uPlajJk>}}

Part 1.
{{<youtube QOpOlDjUuIc>}}

Part 1.
{{<youtube k7mvM72aFhs>}}

Part 1.
{{<youtube uLZp1ux8iTs>}}

Part 1.
{{<youtube tCZ-oc6A3bk>}}

Part 1.
{{<youtube Zfa6DR1HiIQ>}}

Part 1.
{{<youtube L2HP_CyXRMs>}}

Part 1.
{{<youtube Mtuug_74inA>}}

Part 1.
{{<youtube Ovqi_ny6yxY>}}
asbfkjanfdkajnsfdlajk
Part 1.
{{<youtube xJXMxnzs70w>}}

Part 1.
{{<youtube Ow__vL9RJiA>}}

Part 1.
{{<youtube JECJAiZFgNs>}}

Part 1.
{{<youtube JlAGqE-bXTE>}}

Part 1.
{{<youtube pnTeb_nJEy8>}}
asbfkjanfdkajnsfdlajk
Part 1.
{{<youtube qpaeBKTJayw>}}

Part 1.
{{<youtube fYIhmiVUDzk>}}

Part 1.
{{<youtube glGstY4nrxc>}}

Part 1.
{{<youtube VPhf3fFY2hE>}}

Part 1.
{{<youtube g9OqgYS6ICI>}}

Part 1.
{{<youtube BTjxUS_PylA>}}


Part 11.
{{<youtube uxe_0RFgT7A>}}

Part 12.
{{<youtube xMNSTBGoGbU>}}


Design bulk file processing system.
Design promotional notification system.

## Java

|Topic|Link|
|---|---|
|Interview|https://suchismita-deb.github.io/tags/interviewquestion/|
|Java|https://suchismita-deb.github.io/tags/java/|
|Git|https://suchismita-deb.github.io/tags/git/|

## Spring

| Topic              |Link|
|--------------------|---|
| Spring             |https://suchismita-deb.github.io/tags/spring/|
| Redis              |https://suchismita-deb.github.io/tags/redis/|
| Crud               |https://suchismita-deb.github.io/tags/crud/|
| Rest               |https://suchismita-deb.github.io/tags/rest/|
| JDBC               |https://suchismita-deb.github.io/tags/jdbc/
| Spring Boot Course |https://suchismita-deb.github.io/tags/springbootcourse/
| Spring Security    |https://suchismita-deb.github.io/tags/spring-security/|



## System Design

| Topic            |Link|
|------------------|---|
| Computer Network |https://suchismita-deb.github.io/tags/computer-networks/|


## Design Pattern

| Topic            |Link|
|------------------|---|

## DSA

| Topic            | Link                                       |
|------------------|--------------------------------------------|
| Bit Manipulation | https://suchismita-deb.github.io/tags/dsa/ |

## Behavioral Interview

|Topic| Link                                                         |
|---|--------------------------------------------------------------|
|Behavioral Interview| https://suchismita-deb.github.io/tags/behavoiral-interview/  |


You can download the PDF file from [System Design Handbook](/files/SystemDesignHandbook.pdf).  
You can download the PDF file from [OS_Full_Notes](/files/OS_Full_Notes.pdf).  
You can download the PDF file from [Grokking-the-advanced-system-design-interview](/files/Grokking-the-advanced-system-design-interview.pdf).  
You can download the PDF file from [Grokking-the-system-design-interview](/files/Grokking-the-system-design-interview.pdf).  

|Company|YOE|Base|
|---|---|---|
|TOP Product Based|1 YOE|15 to 25.|  
|Medium Comapny|1 YOE|8 to 15.|  
|Top product Based|2YOE|20 to 35.
|Medium Company|2 YOE|12 to 22.
|Top Product Based|3 YOE|25 to 45.
|Medium Company|3 YOE|15 to 30.


System Design.
https://github.com/SweetCodey/system-design-masterclass/tree/main


```java

package com.artist;

import com.artist.dto.ArtistRequest;
import com.artist.model.Artist;
import com.artist.repository.ArtistRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.internal.matchers.apachecommons.ReflectionEquals;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.isA;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureMockMvc
class ArtistApplicationTests {
@Autowired
private ArtistRepository artistRepository;
@Autowired
private MockMvc mockMvc;
private static final ObjectMapper om = new ObjectMapper();

    @BeforeEach
    public  void setup() {
        artistRepository.deleteAll();
    }

    private ArtistRequest createSamplePlayListRequest() {
        return new ArtistRequest(
                "Henry",
                "Kaldera"
        );
    }

    @Test
    void testCreatePlayList() throws Exception {
        ArtistRequest sampleArtistRequest = createSamplePlayListRequest();
        Artist actualRecord = om.readValue(mockMvc.perform(post("/v1/artists")
                        .contentType("application/json")
                        .content(om.writeValueAsString(sampleArtistRequest)))
                .andDo(print())
                .andExpect(jsonPath("$.id", greaterThan(0)))
                .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString(), Artist.class);
        assertTrue(artistRepository.findById(actualRecord.getId()).isPresent());
    }

    @Test
    void testListOfTracks() throws Exception {
        ArtistRequest sampleArtistRequest = createSamplePlayListRequest();

        for (int i = 0; i < 5; i++) {
            om.readValue(mockMvc.perform(post("/v1/artists")
                            .contentType("application/json")
                            .content(om.writeValueAsString(sampleArtistRequest)))
                    .andDo(print())
                    .andExpect(jsonPath("$.id", greaterThan(0)))
                    .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString(), Artist.class);
        }

        List<Artist> actualResult = om.readValue(mockMvc.perform(get("/v1/artists"))
                .andDo(print())
                .andExpect(jsonPath("$.*", isA(ArrayList.class)))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString(), new TypeReference<List<Artist>>() {
        });

        assertEquals(5, actualResult.size());
    }

    @Test
    void testListOfTracksEmpty() throws Exception {
        mockMvc.perform(get("/v1/artists"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$").isEmpty());
    }

    @Test
    void testPlayListDeleteById() throws Exception {
        ArtistRequest sampleArtistRequest = createSamplePlayListRequest();
        Artist expectedRecord = om.readValue(mockMvc.perform(post("/v1/artists")
                        .contentType("application/json")
                        .content(om.writeValueAsString(sampleArtistRequest)))
                .andDo(print())
                .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString(), Artist.class);

        mockMvc.perform(delete("/v1/artists/" + expectedRecord.getId())
                        .contentType("application/json"))
                .andDo(print())
                .andExpect(status().isNoContent());

        assertFalse(artistRepository.findById(expectedRecord.getId()).isPresent());
    }

    @Test
    void testGetPlayListById() throws Exception {
        ArtistRequest sampleArtistRequest = createSamplePlayListRequest();
        Artist actualRecord = om.readValue(mockMvc.perform(post("/v1/artists")
                        .contentType("application/json")
                        .content(om.writeValueAsString(sampleArtistRequest)))
                .andDo(print())
                .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString(), Artist.class);

        Artist expectedRecord = om.readValue(mockMvc.perform(get("/v1/artists/" + actualRecord.getId())
                        .contentType("application/json"))
                .andDo(print())
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString(), Artist.class);

        assertTrack(actualRecord, expectedRecord);
    }

    @Test
    void testGetPlayListByID_NotFound() throws Exception {
        long nonExistentId = 999L;
        mockMvc.perform(get("/v1/artists/" + nonExistentId)
                        .contentType("application/json"))
                .andDo(print())
                .andExpect(status().isNotFound());
    }


    private void assertTrack(Artist actualRecord, Artist expectedRecord) {
        Assertions.assertTrue(new ReflectionEquals(actualRecord).matches(expectedRecord));
    }
}
```



