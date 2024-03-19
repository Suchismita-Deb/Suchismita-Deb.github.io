+++
title = 'Docker'
date = 2024-03-17T00:18:06+05:30
tags=["spring","docker"]
+++


When we use docker then we do not need to care about the version of the stack. We also do not need to care about the application that is OS specific.

In Docker we have containers and we put everything in teh container and can make multiple copy of the container and use it.

Docker CLI and Desktop.

There is Docker Daemon which builds the container and scale up and do everything.
Desktop is for the visualization.

In cmd we can write the `docker -version` check the version.


Install one image `docker run -it ubuntu` first will check if we have the image then it will install form the `hub.docker.com` here all the public containers are kept and we can pull from there, the terminal will open with ubuntu and we can run the command `whoami` will show the result and can run `node --version` will give error as in the ubuntu image the node is not installed. We can do the task in ubuntu.
When installed we can see in the desktop and will get the id.
Container runs the image.
The Ubuntu that we installed from the hub.docker is the container.

Now we can create images and work separately. No two images will be connected. Say i can make an ubuntu image with tools like mongo and node installed and then asked the developers to use the image. 

Another ubuntu image with some other command and use the image.

In cmd if it is like `C:\Users\hp>` then it is in local machine and when it is `root@48ce67ce873b` then it is inside the image.

`docker container ls` shows the running containers.
`docker container ls -a` shows all the containers even when it is not running.
This will list the container with id and name. 
`docker start dockerName` this will start the container with the docker name.
`docker stop dockerName` this will stop the container with the name.

`docker run -it <image_name>` to run the image.
`docker exec <container_name> <command>` to execute the command.
Like in calcom there will be some docker image we need to run the image. 