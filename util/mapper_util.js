// NODE MODULES:
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const buff = require('buffer');

var mainUtil = require("./main_util.js");



// FS STATS - OBTAINS BASIC DATA - GENERATES JSON FILE
//--------------------------------------------------------------------------//
function fsStats(pathStr) {
	return fs.statSync(pathStr);
}


// HELPER FUNCTIONS
//--------------------------------------------------------------------------//
function mapSplit(line) {
	let lineArr, key, val;
		lineArr = line.split(/(=)/g);
		key = lineArr[0];
		val = lineArr[2];

	return {key, val}; // console.log({key, val});
}


function filterOutBad(line) { // console.log(`CHECKS: ${(line.key==undefined)} - ${(line.key==')')} - ${(line.val==undefined)} - ${(line.val==' (')}`)

	if (line.key==undefined || line.val==undefined || line.key==')' || line.val==' (' || line.val==' (null)' || line.val==' ""') {
		return false;
	} else {
		return true;
	}
}


function trimStrings(line) { // console.log(line);
	let key, val;
		key = line.key.trim(); // strip out whitespace
		val = line.val.trim(); // strip out whitespace
		val = val.replace(/\"/g, ''); // strip out double-quotes

	return {key, val};
}


// SPAWNS MDLS - OBTAINS META DATA - GENERATES JSON FILE
//--------------------------------------------------------------------------//
function spawnMDLS(pathStr, fileName) {
	console.log(`//==================================//`);
	console.log(`Hello! Spawn mdls process initiated! ^_^`);

	let mdls, dataStr, newArr, newObj = {};
		mdls = cp.spawn('mdls', [pathStr]);
		mdls.stdout.on('data', (data) => {
			dataStr = data.toString("utf-8");
			newArr = dataStr.split(/\r\n|\r|\n/g);
			newArr = newArr.map(mapSplit);
			newArr = newArr.filter(filterOutBad);
			newArr = newArr.map(trimStrings);
			newArr.forEach((line) => {
				newObj[line.key] = line.val;
			});

			mainUtil.writeFile([__dirname, '..', 'data'], fileName, 'json', newObj);
		})
		mdls.stderr.on('data', (data) => console.log(`stderr: ${data}`));
		mdls.on('close', (code) => console.log(`child process exited with code ${code}`));

	console.log(`//==================================//`);
}

//----------------------------------//
exports.fsStats = fsStats;
exports.spawnMDLS = spawnMDLS;