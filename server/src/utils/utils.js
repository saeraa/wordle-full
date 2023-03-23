function hasOnlyUniqueLetters(str) {
	for (let i = 0; i < str.length; i++) {
		if (str.indexOf(str[i]) !== str.lastIndexOf(str[i])) {
       console.log("hasOnlyUniqueLetters: false", str)
			return false;
		}
	}
   console.log("hasOnlyUniqueLetters: true", str)
	return true;
}

function hasSpecialCharsOrSpaces(str) {
  //console.log("hasSpecialCharsOrSpaces" + str)
	const regex = /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/;

	if (str.match(regex)) {
    // console.log("hasSpecialCharsOrSpaces " + str)
    // console.log("true")
		return true;
	}
  
  // console.log("hasSpecialCharsOrSpaces " + str)
  // console.log("false")
	return false;
}

export {
	hasOnlyUniqueLetters,
	hasSpecialCharsOrSpaces
};
