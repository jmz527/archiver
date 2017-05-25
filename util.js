var fs = require("fs");
var path = require('path');

// HELPER VARS
//--------------------------------------------------------------------------//
let filePath;

// FILE UTIL
//--------------------------------------------------------------------------//

// Takes in an array of directory names, a file name, & a file extension
// Combines it into a path for fs to use
function filePather(path, fileName, ext) {
  filePath = "./";

  if (path!=null && path.length)
    filePath += path.join('/');

  if (ext != null) {
    filePath+='/'+fileName+'.'+ext;
  } else {
    filePath+='/'+fileName;
  }

  console.log(filePath);
  return filePath;
}

// Checks if a thing exists
function checkFor(path, fileName, ext) {
  filePath = filePather(path, fileName, ext);

  return fs.existsSync(filePath)
}

// Checks a directory for files, returns bool
function hasFiles(dir) {
  return fs.readdirSync(dir)
    .some(function(item) {
      return fs.statSync(path.join(dir, item)).isFile();
    })
}

// Checks a directory for folders, returns bool
function hasFolders(dir) {
  return fs.readdirSync(dir)
    .some(function(item) {
      return fs.statSync(path.join(dir, item)).isDirectory();
    })
}

// Given a directory, returns an array of files
function getFiles(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isFile();
      });
}

// Given a directory, returns an array of directories
function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

// Reads a JSON file
function readFile(path, fileName, ext) {
  filePath = filePather(path, fileName, ext);

  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Writes a JSON file
function writeFile(path, fileName, ext, data) {
  filePath = filePather(path, fileName, ext);

  fs.writeFile(filePath, JSON.stringify(data, null, 4), function(err){
    console.log(`File successfully written! - Check your './${path.join('/')}' directory for ${fileName}.${ext}`);
  })
}

exports.filePather = filePather;
exports.checkFor = checkFor;
exports.hasFiles = hasFiles;
exports.hasFolders = hasFolders;
exports.getFiles = getFiles;
exports.getFolders = getFolders;
exports.readFile = readFile;
exports.writeFile = writeFile;