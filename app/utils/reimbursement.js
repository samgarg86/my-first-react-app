var parsePrice = function(price){
	// remove '$'
	return parseFloat(price.substring(1));
};

var parseWeight = function(weight){
	// remove 'kg'
	return parseFloat(weight.substring(0, weight.length - 2));
};

var parseScenario = function(scenario){
	// remove '%'
	return parseFloat(scenario.substring(0, scenario.length - 1));
};

var reimbursement = {
	allowanceTable : {
		Lobster: {
			Mortality: { allowance: .05, reimburse: .50 },
			Shrinkage: { allowance: .03, reimburse: 1.28 },
			Cancelled: { allowance: 0, reimburse: .05 }
		},
		Crab: {
			Mortality: { allowance: .10, reimburse: .50 },
			Shrinkage: { allowance: .01, reimburse: 2.00 },
			Cancelled: { allowance: 0, reimburse: .05 }
		}
	},
	calculate: function (data) {
		var price = parsePrice(data.price);
		var weight = parseWeight(data.weight);
		var scenario = parseScenario(data.scenario);
		var reimbursementType = data.reimbursementType;
		var product = data.product;

		var allowance = this.allowanceTable[product][reimbursementType].allowance;
		var reimburse = this.allowanceTable[product][reimbursementType].reimburse;
		var totalPrice = weight * price;
		var difference = scenario/100 - allowance;
		console.log(totalPrice, difference, reimburse);

		if(difference > 0) {
			return (totalPrice * difference * reimburse).toFixed(2);
		}
		return 0;
	}
};

module.exports = reimbursement;


