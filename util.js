var fs = require("fs");
var path = require('path');

// HELPER VARS
//--------------------------------------------------------------------------//
let filePath;

// FILE UTIL
//--------------------------------------------------------------------------//
function filePather(path, fileName, ext) {
  filePath = "./";

  if (path!=null && path.length)
    filePath += path.join('/');

  filePath+='/'+fileName+'.'+ext;

  console.log(filePath);
  return filePath;
}

function checkFor(path, fileName, ext) {
  filePath = filePather(path, fileName, ext);

  return fs.existsSync(filePath)
}

function getFiles(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isFile();
      });
}

function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

function readJSONFile(path, fileName, ext) {
  filePath = filePather(path, fileName, ext);

  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJSONFile(path, fileName, ext, data) {
  filePath = filePather(path, fileName, ext);

  fs.writeFile(filePath, JSON.stringify(data, null, 4), function(err){
    console.log(`File successfully written! - Check your './${path.join('/')}' directory for ${fileName}.${ext}`);
  })
}

exports.filePather = filePather;
exports.checkFor = checkFor;
exports.getFiles = getFiles;
exports.getFolders = getFolders;
exports.readFile = readFile;
exports.writeFile = writeFile;