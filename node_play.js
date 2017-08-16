var mainUtil = require("../util/main_util.js");

// NODE MODULES:
const path = require('path');
const fs = require('fs');
const os = require('os');
const cp = require('child_process');
const buff = require('buffer');


console.log(`//==================================//`);
console.log(`Hello! Node Play process initiated! ^_^`);


// GLOBAL VARS:
// console.log(__dirname);
// console.log(__filename);

// let test = path.join(__dirname, process.argv[2] || 'target_dirs/testing_grounds');
// console.log(test);

// console.log, console.info, console.warn, console.error, console.dir, console.time, console.timeEnd, console.trace, console.assert

// process


// // PATH MODULE
// //--------------------------------------------------------------------------//

// path.basename('./target_dirs/testing_grounds/first.json'); // returns first.json
// path.dirname('./target_dirs/testing_grounds/first.json'); // returns ./target_dirs/testing_grounds
// path.extname('./target_dirs/testing_grounds/first.json'); // returns .json
// path.format({ root: '/ignored', dir: '/home/user/dir', base: 'file.txt' }); // returns '/home/user/dir/file.txt'
// path.isAbsolute('/'); // returns true
// path.join('target_dirs', 'testing_grounds');
// path.normalize('../archiver/target_dirs/sub_folder/..'); // returns ../archiver/target_dirs
// path.parse('../archiver/target_dirs/sub_folder/second.json') // returns a path obj
// path.relative('../archiver/target_dirs/sub_folder', './mapper.js')// returns relative path
// path.resolve('../archiver/target_dirs/sub_folder/second.json') // returns an absolute path
// path.sep // returns platform-specific path segment separator



// // FS MODULE
// //--------------------------------------------------------------------------//

// fs.mkdirSync()
// fs.rmdirSync()

// fs.existsSync()
// fs.statSync()
// fs.readdirSync()
// fs.readFileSync()
// fs.writeFile()

// fs.open(path.join(__dirname, 'map.json'));


// // OS MODULE
// //--------------------------------------------------------------------------//

// console.log(os.platform())

// let cache = require.cache;
// console.log(cache);

// for (key in cache) {
// 	console.log(cache[key].Module);
// }

// console.log(global);
// console.log(process);



// // CHILD_PROCESS MODULE
// //--------------------------------------------------------------------------//
// cp.exec('open ./map.json');
// cp.exec('open -a "Google Chrome" https://nodejs.org/en/');
// cp.exec(`open /Users/jamesrutledge/Movies/GO.m4v`);
// cp.execSync()

// cp.execFile('node', ['--version'], (err, stdout, stderr) => {
// 	if (err) {
// 		throw err;
// 	}
// 	console.log(stdout);
// });
// cp.execFileSync()

// cp.fork('./mapper.js'); // <-- spawns a new node instance with 'process.execPath'


// // SPAWNS LS & OBTAINS DIR DATA
// //--------------------------------------------------------------------------//
// let ls = cp.spawn('ls', ['-lh', './target_dirs']);
// 	ls.stdout.on('data', (data) => console.log(`stdout: ${data}`));
// 	ls.stderr.on('data', (data) => console.log(`stderr: ${data}`));
// 	ls.on('close', (code) => console.log(`child process exited with code ${code}`));
// cp.spawnSync()


// // SPAWNS MDLS & OBTAINS META DATA
// //--------------------------------------------------------------------------//
// // great resource: https://www.macissues.com/2014/05/12/how-to-look-up-file-metadata-in-os-x/

// let mdls = cp.spawn('mdls', ['/Users/jamesrutledge/Movies/GO.m4v']);
// 	mdls.stdout.on('data', (data) => {

// 		console.log(`stdout: ${data}`);
// 	})


// SPAWNS MDLS & OBTAINS META DATA ATTRIBUTE
// --------------------------------------------------------------------------//
// let mdls = cp.spawn('mdls', ['-name', 'kMDItemDurationSeconds', '/Users/jamesrutledge/Movies/GO.m4v']);
// 	mdls.stdout.on('data', (data) => {

// 		let dataStr = data.toString("utf-8");
// 		let dur = parseFloat(dataStr.split('=')[1]);

// 		// console.log(`stdout: ${data}`)
// 		console.log(`stdout: `)
// 		console.log(dataStr);
// 		console.log(dataStr.length);
// 		console.log(typeof dataStr);
// 		console.log(dur);

// 	});
// 	mdls.stderr.on('data', (data) => console.log(`stderr: ${data}`));
// 	mdls.on('close', (code) => console.log(`child process exited with code ${code}`));


// // SPAWNS MDLS - OBTAINS META DATA - GENERATES JSON FILE
// //--------------------------------------------------------------------------//
// let mdls = cp.spawn('mdls', ['/Users/jamesrutledge/Movies/GO.m4v']);
// 	mdls.stdout.on('data', (data) => {
// 		let dataStr = data.toString("utf-8");
// 		console.log(`stdout: ${dataStr}`);

// 		mainUtil.writeFile([__dirname, '..', 'data'], 'metadata', 'json', { dataStr });
// 	})
// 	mdls.stderr.on('data', (data) => console.log(`stderr: ${data}`));
// 	mdls.on('close', (code) => console.log(`child process exited with code ${code}`));

console.log(`//==================================//`);