# archiver
command line file management tool - helps with archiving &amp; categorizing

# Description

# Technologies Used:

NodeJS

# Installation Instructions:

First, clone this repo to a directory on your local machine:

```sh
git clone git@github.com:jmz527/archiver.git
cd archiver/
```

Then run the mapper.js file with node, specifying the directory you would like to map into json, like so (Note: if no path is given, defaults to 'target_dirs/testing_grounds'):

```sh
node mapper.js path/to/directory
```

# Planning & Wireframes:


# TODOS:

-- Need a bash script that will take out all spaces within file names
-- Need to account for srt files


# Directory Tree:

# Notes:

-- FILE ANALYSIS & TRACKING

	Mapper creates initial json map of file directory
	Wrangler gets the absolute path, the file system stats and the metadata of files


-- DIRECTORY REFORMATION

	Reformmer moves all files within the directory tree to a given flat folder

https://stackoverflow.com/questions/11787016/nodejs-file-statistics