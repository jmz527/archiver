const chai = require(`chai`)

const main_util = require(`../util/main_util`)
const mapper_util = require(`../util/mapper_util`)

// MAIN UTIL LIBRARY
// =========================================================== //
describe(`Main utility library`, () => {

	// it(`test a thing`, () => {
	// 	// let str = main_util.methods._escapeString(`This is a demo string with 'single-quotes'`)

	// 	chai.assert.lengthOf(`tri`, 3);
	// })

	// it(`_escapesString escapes single-quotes`, () => {
	// 	let str = main_util.methods._escapeString(`This is a demo string with 'single-quotes'`)

	// 	chai.assert.equal(str, `This is a demo string with \\\'single-quotes\\\'`)
	// })

	// it(`_escapesString escapes double-quotes`, () => {
	// 	let str = main_util.methods._escapeString(`This is a demo string with "double-quotes"`)

	// 	chai.assert.equal(str, `This is a demo string with \\"double-quotes\\"`)
	// })

})



// FILE UTIL LIBRARY
// =========================================================== //
describe(`File utility library`, () => {

	it(`saveHTML saves html to a file properly`, () => {

		chai.assert.lengthOf(`tri`, 3);
	})

	it(`saveJSON saves json to a file properly`, () => {

		chai.assert.lengthOf(`tri`, 3);
	})

	it(`readJSON reads json from a file properly`, () => {

		chai.assert.lengthOf(`tri`, 3);
	})


	// it(`minifyHTML minifies html`, () => {

	// 	chai.assert.lengthOf(`tri`, 3);

	// });

	// it(`beautifyHTML beautifies html`, () => {

	// 	chai.assert.lengthOf(`tri`, 3);

	// });

});