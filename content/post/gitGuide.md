+++
title = 'Git Guide'
date = 2023-11-18T08:01:08+05:30
+++

Detailed Explanation will go here.<br/> Basic Command will be in https://github.com/Suchismita-Deb/Github-Guide

### git init.
`git init` will create the config file and it is for the local configuration. It will not be pushed in the server.

When we write `git init` it creates the .git folder and the `config file` looks like.
```shell
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
```
### git remote add
When we write `git remote add origin https://github.com/Suchismita-Deb/x.git` then it creates nr remote in config file.
```shell
[remote "origin"]
	url = https://github.com/Suchismita-Deb/x.git
	fetch = +refs/heads/*:refs/remotes/origin/*
```
### git remote set-url.
```shell
# If the project is already a git project and you want to set github repo to the existing project.
# If you rename the project then you can also set from here.
git remote set-url <remote_name> <remote_url>
git remote set-url origin https://github.com/Suchismita-Deb/x1.git
```
This will change in the config file.
### git branch.
The more we push and pull from different branch and create new branch then it will be created in the config file.

```shell
[branch "test"]
	remote = origin
	merge = refs/heads/test
```

### Delete any branch in git.
When we do not need the branch or the details we can delete from the config file.
First checkout to main or any other branch then delete the branch. 
```shell 
# To delete a fully merged branch (with prompt if not fully merged)
git branch -d branch_name

# To force delete a branch, including unmerged changes
git branch -D branch_name
```
This will delete the details from the config file.

### Cleaning config file.
```shell
git remote prune origin && git repack && git prune-packed && git reflog expire --expire=1.month.ago && git gc --aggressive
```

`git prune` This command removes any local references to remote branches that no longer exist on the remote repository named "origin". It cleans up your local tracking branches that are no longer relevant.

`git repack` This command packs loose objects in the repository into pack files, optimizing the storage and performance of the repository by compressing objects.

`git prune-packed` This removes redundant pack files, cleaning up any pack files that are no longer necessary after repacking.

`git reflog expire --expire=1.month.ago` This command expires old entries in the reflog that are older than one month. The reflog is a reference log that stores a history of where the tips of branches were in the past.

`git gc --aggressive` This command triggers the garbage collection process in Git. It optimizes the repository by cleaning up unnecessary files and optimizing the repository's storage.

### Revert back the changes already commit and push in the server.

For personal project where only I am contributing.

`git reset HEAD~1` This will revert back the changes. The changes will be there in the stage area.

`git reset --hard HEAD~1` This will remove the changes from the stage area.

`git push -f origin main` This will push the changes andwe have to force push the changes. Now the repo will have the file which was like the previous commit.

If we need to do revert 5 commit then we need to run the first command 5 time.


### Removing the file or folder from the server.
`git rm --cached <file/folder_path>` - Remove a file from the staging area (also known as the index), while keeping it in your working directory `git rm --cached build/*` 

Then we can push to the main. `git push origin master`