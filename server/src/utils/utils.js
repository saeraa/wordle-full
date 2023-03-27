function hasOnlyUniqueLetters(str) {
	for (let i = 0; i < str.length; i++) {
		if (str.indexOf(str[i]) !== str.lastIndexOf(str[i])) {
			return false;
		}
	}
	return true;
}

function hasSpecialCharsOrSpaces(str) {
	const regex = /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/;

	if (str.match(regex)) {
		return true;
	}
  
	return false;
}

export {
	hasOnlyUniqueLetters,
	hasSpecialCharsOrSpaces
};
