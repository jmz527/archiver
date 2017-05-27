var mainUtil = require("./main_util.js");

// NODE MODULES:
const path = require('path');
const fs = require('fs');
const os = require('os');
const cp = require('child_process');
const repl = require('repl');


console.log(`//==================================//`);
console.log(`Hello! Node Play process initiated! ^_^`);


// GLOBAL VARS:
console.log(__dirname);
console.log(__filename);

// let test = path.join(__dirname, process.argv[2] || 'target_dirs/testing_grounds');
// console.log(test);

// console
// .log
// .info
// .warn
// .error
// .dir
// .time
// .timeEnd
// .trace
// .assert

// export
// exports

// process


// PATH MODULE:
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



// FS MODULE:

// fs.mkdirSync()
// fs.rmdirSync()

// fs.existsSync()
// fs.statSync()
// fs.readdirSync()
// fs.readFileSync()
// fs.writeFile()

// fs.open(path.join(__dirname, 'map.json'));


// OS MODULE:
// console.log(os.platform())

// let cache = require.cache;
// console.log(cache);

// for (key in cache) {
// 	console.log(cache[key].Module);
// }

// console.log(global);
// console.log(process);

// console.log(stdout)
// console.log(stderr)


// CHILD_PROCESS MODULE:
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

// let ls = cp.spawn('ls', ['-lh', './target_dirs']);
// 	ls.stdout.on('data', (data) => console.log(`stdout: ${data}`));
// 	ls.stderr.on('data', (data) => console.log(`stderr: ${data}`));
// 	ls.on('close', (code) => console.log(`child process exited with code ${code}`));
// cp.spawnSync()


// REPL MODULE:
// repl.start();


// mainUtil.writeFile(['.'], 'process', 'json', proc);
console.log(`//==================================//`);