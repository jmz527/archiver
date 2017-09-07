const fs = require('fs')
const path = require('path')
const beautify_html = require('js-beautify').html
const minify = require('html-minifier').minify

const methods = (function() {
	return {

		pather:function(dirPath, fileName, ext) {
		// The pather function takes up to three arguements (two minimum),
		// an array or string that represents the directory path, a string for the file's name,
		// and an optional file extension. Returns a proper path.

			let thisPath;

			if (typeof dirPath == 'string') {

				thisPath = path.join(dirPath, fileName)
				thisPath += (ext ? `.${ext}`:``)

			} else if (typeof dirPath == 'object' && dirPath.length) {

				thisPath = path.join(dirPath.join('/'), fileName)
				thisPath += (ext ? `.${ext}`:``)

			} // console.log(thisPath)

			return thisPath
		},

		// Checks if a thing exists
		checkFor:function(thisPath) {
			return fs.existsSync(thisPath)
		},

		// Checks a directory for files, returns bool
		hasFiles:function(dirPath) {
			return fs.readdirSync(dirPath)
				.some(function(item) {
					return fs.statSync(path.join(dirPath, item)).isFile();
				})
		},

		// Checks a directory for folders, returns bool
		hasDirs:function(dirPath) {
			return fs.readdirSync(dirPath)
				.some(function(item) {
					return fs.statSync(path.join(dirPath, item)).isDirectory();
				})
		},

		// Given a directory, returns an array of files
		getFiles:function(dirPath) {
				return fs.readdirSync(dirPath)
					.filter(function(file) {
						return fs.statSync(path.join(dirPath, file)).isFile();
					});
		},

		// Given a directory, returns an array of directories
		getDirs:function(dirPath) {
				return fs.readdirSync(dirPath)
					.filter(function(file) {
						return fs.statSync(path.join(dirPath, file)).isDirectory();
					});
		},

		// fs.statSync, returns data about the file
		getFileStats:function(thisPath) {
			return fs.statSync(thisPath);
		},


		// HTML SAVE
		// =========================================================== //
		saveHTML:function(thisPath, html) {
			if (!fs.existsSync(`${thisPath}.html`)) { console.log(`HTML example file not found`);

				fs.writeFile(`${thisPath}.html`, html, function(err){
					console.log(`\x1b[36m%s\x1b[0m`, `HTML file successfully written!`)
					console.log(`\x1b[36m%s\x1b[0m`, `Check your project directory for the ${thisPath}.html file`)
				})

			}
		},


		// JSON SAVE
		// =========================================================== //
		saveJSON:function(thisPath, json) {
			fs.writeFile(`${thisPath}.json`, JSON.stringify(json, null, 4), function(err){
				console.log(`\x1b[36m%s\x1b[0m`, `JSON file successfully written!`)
				console.log(`\x1b[36m%s\x1b[0m`, `Check your project directory for the ${thisPath}.json file`)
			})
		},


		// JSON READ
		// =========================================================== //
		readJSON:function(thisPath) {
		// Reads a json file and returns the object
		// If file doesn't exist, error.

			if (fs.existsSync(thisPath)) {

				return JSON.parse(fs.readFileSync(thisPath, 'utf8'))

			} else {
				console.log(`\x1b[31m%s\x1b[0m`, `ERROR: Missing File`);  //red
				console.log(`\x1b[31m%s\x1b[0m`, `"${thisPath}.json" does not exist`);
			}

		},


		// HTML BEAUTIFY
		// =========================================================== //
		beautifyHTML:function(html_path) { // console.log(html_path);

			const bConfig = {
				"indent_size": 4,
				"html": {
					"end_with_newline": true,
					"js": { "indent_size": 2 },
					"css": { "indent_size": 2 }
				},
				"css": { "indent_size": 1 },
				"js": { "preserve-newlines": true }
			}

			fs.readFile(html_path, 'utf8', function (err, data) {
				if (err) throw err;

				let newHTML = beautify_html(data, bConfig);

				fs.writeFile(html_path, newHTML, function(err){
					console.log(`\x1b[36m%s\x1b[0m`, `HTML file successfully beautified!`);
					console.log(`\x1b[36m%s\x1b[0m`, `Check your project directory for the ${html_path} file`);
				})

			})

		},

		// HTML MINIFY
		// =========================================================== //
		minifyHTML:function(html_path) { // console.log(html_path);

		// https://kangax.github.io/html-minifier/
		// https://github.com/kangax/html-minifier

			const mConfig = {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					decodeEntities: true,
					html5: true,
					minifyCSS: true,
					minifyJS: true,
					processConditionalComments: true,
					processScripts: ["text/html"],
					removeAttributeQuotes: true,
					removeComments: true,
					removeEmptyAttributes: true,
					removeTagWhitespace: true,
					trimCustomFragments: true
			}

			fs.readFile(html_path, 'utf8', function (err, data) {
				if (err) throw err;

				let newHTML = minify(data, mConfig);

				fs.writeFile(html_path, newHTML, function(err){
					console.log(`\x1b[36m%s\x1b[0m`, `HTML file successfully minified!`);
					console.log(`\x1b[36m%s\x1b[0m`, `Check your project directory for the ${html_path} file`);
				})

			})

		}

	}
}());

exports.methods = methods;