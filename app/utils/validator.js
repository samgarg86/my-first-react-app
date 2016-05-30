var validator = {
	validateAll: function (data) {
		var allValid = true;
		for (var prop in data) {
			if(!data[prop]) { allValid = false; }
		}
		return allValid;
	}
};

module.exports = validator;
