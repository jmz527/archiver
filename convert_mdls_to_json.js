const file_util = require(`./util/file_util.js`)
var data = require(`./data/metadata.json`)

let newArr, newObj, lineArr, key, val
	newArr = data.dataStr.split(/\r\n|\r|\n/g)
	newObj = {};


newArr = newArr.map((line) => {
	lineArr = line.split(/(=)/g)
	key = lineArr[0]
	val = lineArr[2]

	// console.log({key, val})
	return {key, val}
});


newArr = newArr.filter(filterLine)


function filterLine(line) {
	// console.log(`CHECKS: ${(line.key==undefined)} - ${(line.key==')')} - ${(line.val==undefined)} - ${(line.val==' (')}`)

	if (line.key==undefined || line.val==undefined || line.key==')' || line.val==' (' || line.val==' (null)' || line.val==' ""') {
		return false;
	} else {
		return true;
	}
}



newArr = newArr.map((line) => {
	console.log(line);

	key = line.key.trim(); // strip out whitespace
	val = line.val.trim(); // strip out whitespace
	val = val.replace(/\"/g, ''); // strip out double-quotes

	return {key, val};
});


newArr.forEach((line) => {
	newObj[line.key] = line.val;
});


// console.log(newArr);
// console.log(newObj);

file_util.methods.saveJSON(file_util.methods.pather([__dirname, `..`, `data`], `converted_metadata`, `json`), newObj);