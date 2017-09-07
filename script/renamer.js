const path = require(`path`)
const cp = require(`child_process`)
const file_util = require(`../util/file_util.js`)

// GLOBAL VARIABLES
//----------------------------------//
var rootDir = process.argv[2]; // console.log(rootDir);


// DIRECTORY ANALYSIS & MAPPING
//--------------------------------------------------------------------------//
// Top-level function that starts us off - maps a directory
function renamerInit(rootDir) {
	let dirExists, hasFiles, hasDirs, newPath;
		dirExists = file_util.methods.checkFor(rootDir);
		hasFiles = file_util.methods.hasFiles(rootDir);
		hasDirs = file_util.methods.hasDirs(rootDir);

	// console.log({dirExists, hasFiles, hasDirs});

	if (dirExists && (hasFiles || hasDirs)) {

		console.log(`\x1b[35m%s\x1b[0m`, `//==================================//`);
		console.log(`\x1b[35m%s\x1b[0m`, `Hello! Renaming process initiated! ^_^`);
		console.log(`\x1b[35m%s\x1b[0m`, `Now renaming files within the "${rootDir}" directory.`);
		console.log(`\x1b[35m%s\x1b[0m`, `//==================================//`);

		dirDive(rootDir);

	} else if (!hasFiles && !hasDirs) {

		console.log(`\x1b[31m%s\x1b[0m`, `ERROR: the "${Mapr.rootDir}" directory is empty.`);
	}

}

function dirDive(pathStr) {

	// If the target dir has child dirs
	if (file_util.methods.hasDirs(pathStr)) directoryRoundup(pathStr);

	// If the target dir has Files
	if (file_util.methods.hasFiles(pathStr)) filesRoundup(pathStr);

}

// Maps the dirs within a given dir (defined by the pathStr) to the Obj
function directoryRoundup(pathStr) {
	let dirPath, dirs = file_util.methods.getDirs(pathStr);

	dirs.forEach(function(dir) {

		dirPath = path.join(pathStr, dir);

		dirDive(dirPath); // <-- Recursive function here

	})

}

// Maps the files in a directory to our data Obj
function filesRoundup(pathStr) {
	let files = file_util.methods.getFiles(pathStr);
		files = files.filter((file) => (file != `.DS_Store`));

	// console.log(`\x1b[36m%s\x1b[0m`, pathStr)

	// loop over the files
	for (var i = 0; i < files.length; i++) {

		if (files[i].match(/\s/g)) {

			let oldPath = path.parse(path.join(pathStr, files[i]))

			let newPath = path.format({
				root: '/',
				dir: oldPath.dir,
				base: oldPath.base.split(` `).join(`_`),
				ext: '.json',
				name: oldPath.name.split(` `).join(`_`)
			})

			console.log(obj)

			// newPath = path.join(pathStr, files[i].split(/\s/g).join('_'))
			// files[i] = files[i].split(` `).join(`\\ `)

			// console.log(path.join(pathStr, files[i]))
			// console.log(path.join(pathStr, newPath))

			// cp.exec(`mv -v ${path.join(pathStr, files[i])} ${newPath}`, (err, stdout, stderr) => {
			// 	if (err) throw err

			// 	console.log(`\x1b[36m%s\x1b[0m`, stdout);
			// });

		}

	}

}


renamerInit(rootDir);