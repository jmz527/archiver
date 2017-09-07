const methods = (function() {
	return {

		// Generates a universally unique ID
		genUUID:function() {
			return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function(c) {
				var r = Math.random()*16|0, v = c == `x` ? r : (r&0x3|0x8);
				return v.toString(16);
			});
		},


		// https://stackoverflow.com/questions/7744912/making-a-javascript-string-sql-friendly
		_escapeString: function(str) {
			return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
				switch (char) {
					case "\0":
						return "\\0";
					case "\x08":
						return "\\b";
					case "\x09":
						return "\\t";
					case "\x1a":
						return "\\z";
					case "\n":
						return "\\n";
					case "\r":
						return "\\r";
					case "\"":
					case "'":
					case "\\":
					case "%":
						return "\\"+char; // prepends a backslash to backslash, percent,
										  // and double/single quotes
				}
			});
		},


		// This is used to wrap native DOM events without writing over them
		addEvent:function(object, type, callback) {
			if (object == null || typeof(object) == `undefined`) return;
			if (object.addEventListener) {
				object.addEventListener(type, callback, false);
			} else if (object.attachEvent) {
				object.attachEvent(`on${type}`, callback);
			} else {
				object[`on${type}`] = callback;
			}
		},

		// Unflatten JSON
		unflattenJSON:function(data) {
				`use strict`;
				if (Object(data) !== data || Array.isArray(data))
						return data;
				var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
						resultholder = {};
				for (var p in data) {
						var cur = resultholder,
								prop = ``,
								m;
						while (m = regex.exec(p)) {
								cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
								prop = m[2] || m[1];
						}
						cur[prop] = data[p];
				}
				return resultholder[``] || resultholder;
		},

		// Flatten JSON
		flattenJSON:function(data) {
				var result = {};
				function recurse (cur, prop) {
						if (Object(cur) !== cur) {
								result[prop] = cur;
						} else if (Array.isArray(cur)) {
								 for(var i=0, l=cur.length; i<l; i++)
										 recurse(cur[i], `${prop}[${i}]`);
								if (l == 0)
										result[prop] = [];
						} else {
								var isEmpty = true;
								for (var p in cur) {
										isEmpty = false;
										recurse(cur[p], prop ? `${prop}.${p}` : p);
								}
								if (isEmpty && prop)
										result[prop] = {};
						}
				}
				recurse(data, ``);
				return result;
		}

	}
}());

exports.methods = methods;