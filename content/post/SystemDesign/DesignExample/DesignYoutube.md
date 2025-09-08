+++
title = 'Design Video Streaming.'
date = 2025-08-08T18:45:32+05:30
url= "/post/systemdesign/designexample/DesignVideoStreamingSystem"
tags = ['interview question', 'system design']
+++

# Design Youtube.

### Design Video streaming platform.

First Functional and non functional requirements, DAU.

### Functional Requirements.

User should be able to upload a video.
User should get some recommended video in the home page and should be able to search the video.
Play the video.
User can use mobile, laptop. It should play in any device.

### Non Functional Requirements.

No buffering - (Sounds too ambitious we can manage it.)
No buffering meaning video should be available when user wants to play. Server serving the video should be responding in very low latency and should be available. No buffering meaning - low latency and high availability.

Increase the user session time. Need to make the user stay in the platform. No buffering and showing right content is important.

Issue I faced like when asked for Video streaming platform I was stick to the Youtube, It can be Netflix, Amazon Prime, Hotstar. I say the term and make the conversation interesting.



There are two parts one is making the video and upload, stream, search, watch, recommendation, comments, analytics.

### how the live streaming works.

Make the content with the use of Encoder like the OBS or webcam. 
The task of the Encoder is to package the video stream and send the message to the transport protocol for processing.

The most popular transport protocol is the RTMP(Real time transport Protocol) / SRT(Secure Reliable Transport).

RTMP is a TCP based and SRT is UDP based.

SRT has low latency and better for poor network connection.

To provide the best upload condition for teh streamer there is PoP (Point of Presence) servers worldwide.

The streamers connects to the Pop Servers closer to them and it happens automatically with the **DNS Latency based** routing or **Anycast** network.

Stream reach the Pop servers and then it is transmitted over the fast and reliable backbone network to the platform for the further processing. 

The platform add the processing for different quality like 480, 720p.
Modern application has **Adaptive Bitrate Streaming** and it gets the rate for the specific network.

It happens in the category.
incoming video stream is transcoded in different resolution and bit rates.
the transcoded video is divided in smaller segement and bit length. This is called Segmentation.
Transcoding is compute intensive and input stream is trancode in different format in parallel.

The collection of video from the transcoding process and packaged in live streaming format like HLS or DASH(Dynamic Adaptive Streaming over the HTTP) format do the video streaming can understand.

HLS invested by Apple in 2009. It contains the manifest file and the video chunks and contains the video of few mins. Teh manifest file is the directory to tell the video player about the output format ans where to lead the video chunks over the HTTP.

The resulting HLS manifest and video chunks are cached by the CDN. It reduces the last-mile latency to the viewers.

### Functional Requirements - Upload the video and watch.
### Non - functional requirements.

Reliable and the video should not get delete after the upload.

Scalability - One video can have 1000s of concurrent viewer.  

### Back of the envelop estimation.

1B DAU. 

Upload:watch = 1:100. For one upload video there are 100 user watching the video.

Read and write of the video. Say each user is watching 5 videos per day.

There is 5B video watch per day. 1/100 and 1% of 5B is the video upload = 50M.

Availability > Consistency. When we refresh we should get the video and correct response. We can wait for few mins to get the new video.

Minimize the latency when we click the video it should return the video and there should not be any wait.

### Designing the video upload.

User upload the video and there is the load balancer 50m  video upload daily. The load balancer is then storing the video in    the app server. 






