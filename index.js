var main_util = require("./util.js");

// TODO: DIRECTORY ANALYSIS & MAPPING

// var dir = "./for_testing";


let results = {}, name, files = mainUtil.getFiles('./for_testing');

files.forEach(function(file) {
	name = file.split('.')[0];
	results[name] = mainUtil.readFile(['for_testing'], name, 'json');
})

mainUtil.writeFile(['.'], 'map', 'json', results);








// TODO: FILE ANALYSIS & TRACKING

// TODO: DIRECTORY REFORMATION

// TODO: DATABASE SETUP

// TODO: ARCHIVING PROCEDURES

// TODO: SEARCH, SORT, FILTERING DB QUERIES

// TODO: CATEGORIES & TAGGING

// TODO: PLAY COMMAND