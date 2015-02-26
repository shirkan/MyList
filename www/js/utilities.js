/*
	Utilities js by Liran Cohen
*/

//	Date utilities
	/*	dateInXDays 
		input: 
			date - starting date (empty for today)
			x - days to add (or negative value for subtruction)
		output:
			the date in x days
	*/
	function dateInXDays (date, x) {
		date = (date == '') ? new Date() : date

		var result = new Date(date)
		result.setDate(date.getDate() + x)

		return result
	}

	/*	dateInXDays 
		input: 
			date - starting date (empty for today)
			format - string representing the format:
				d - day
				m - month
				y - full year

				for example: dmy 
				delim - delimiter to use in date format
		output:
			date in format 
	*/
	function dateWithDelim(date, format, delim) {
		date = (date == '') ? new Date() : date;
		delim = (delim == '') ? "/" : delim;

		var res = ""
		for ( var i = 0; i < format.length; i++ ) {
			switch (format[i]) {
				case "d":
					res = res + ("0" + date.getDate()).slice(-2)
					break;
				case "m":
					res = res + ("0" + (date.getMonth() +1)).slice(-2)
					break;
				case "y":
					res = res + date.getFullYear()
					break;
			}

			if (i < (format.length - 1)) {
				res = res + delim
			}
		}

		return res
	}


//	localStorage lists utilities

	function LSlistGet(index) {
		var l = localStorage.getItem("list");
		if (l === null) return [];
		l = l.split(',');

		// var list = [];
		// for (var i = 0; i < l.length; i++) {
		// 	list.push(localStorage.getItem(l[i]));
		// }

		if (index === undefined) {
			return l;
		} else {
			return l[index];
		}
	}

	function LSlistAdd(key, val) {
		localStorage.setItem(key, val);
		var l = LSlistGet();
		l.push(key);
		LSlistSave(l);
	}

	function LSlistRemove(id) {
		var l = LSlistGet();
		l.splice(l.indexOf(id), 1);
		localStorage.removeItem(id);
		LSlistSave(l);
	}

	function LSlistSave(list) {
		localStorage.setItem("list", list);
	}

	function LSlistReplace( indexA, indexB ) {
		var l = LSlistGet();
		var temp = l[indexA];
		l[indexA] = l[indexB];
		l[indexB] = temp;
		LSlistSave(l);
	}

	function LSlistClear() {
		var l = LSlistGet();
		for (var i = 0; i < localStorage.length; i++) {
			localStorage.removeItem(l[i]);	
		}
		localStorage.removeItem("list");
	}

	function LSlistLength() {
		return LSlistGet().length;
	}

	function LSlistGetKey(key) {
		return localStorage.getItem(key);
	}

	function LSlistUpdate( key, val) {
		localStorage.setItem(key, val);
	}


//	localStorage dictionary utilities

	function LSdictGet(name) {
		return JSON.parse(localStorage.getItem(name));
	}

	function LSdictAdd(name, key, val) {
		var l = LSdictGet(name);
		l["item" + key] = val;

		LSdictSave(name, l);
	}

	function LSdictRemove(index, key) {
		var l = LSdictGet(name);
		delete l["item" + key];

		LSdictSave(name, l);
	}

	function LSdictSave(name, list) {
		localStorage.setItem(name, JSON.stringify(list));
	}

	function LSdictReplace( indexA, indexB ) {
		var l = LSdictGet(name);
		var temp = l["item" + indexA];
		l["item" + indexA] = l["item" + indexB];
		l["item" + indexB] = temp;

		LSdictSave(name, l);
	}

	function LSdictClear(name) {
		localStorage.removeItem(name);
	}

	function LSdictLength(name) {
		var l = LSdictGet(name);
		return Object.keys(name).length;
	}

	function LSdictForEach(name, fn) {
		var l = LSdictGet(name);
		var length = LSdictLength(name);

		for (var i =0; i<length; i++) {
			fn(l["item" + i], i);
		}
	}


//	Misc.
	// clear selection
	function clearSelection() {
	    if (window.getSelection) {
		  if (window.getSelection().empty) {  // Chrome
		    window.getSelection().empty();
		  } else if (window.getSelection().removeAllRanges) {  // Firefox
		    window.getSelection().removeAllRanges();
		  }
		} else if (document.selection) {  // IE?
		  document.selection.empty();
		}
	}