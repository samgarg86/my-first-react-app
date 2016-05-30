var React = require('react');
var ReimbursementCalculator = require('../utils/reimbursement');
require('../styles/result.scss');


var Result = React.createClass({
	getInitialState: function () {
		return {
			product: '',
			reimbursementType: '',
			weight: 0,
			price: 0,
			scenario: 0,
			reimbursement: 0
		}
	},
	componentDidMount: function () {
		var query = this.props.location.query;
		var product = query.product,
			reimbursementType =  query.reimbursementType,
			weight = query.weight,
			price = query.price,
			scenario = query.scenario;

		var reimbursement = ReimbursementCalculator.calculate(query);

		this.setState({
			product: product,
			reimbursementType: reimbursementType,
			weight: weight,
			price: price,
			scenario: scenario,
			reimbursement: reimbursement
		});
	},
	render: function() {
		var reimbursementParams =
			ReimbursementCalculator.allowanceTable[this.props.location.query.product][this.props.location.query.reimbursementType];
		return (
			<div className="result-container">
				<section className='result text-center'>
					If you sold <span className='blue'>{this.state.product}</span> and there was a <span
					className='blue'>{this.state.reimbursementType}</span> event of <span
					className='blue'>{this.state.scenario}</span> involving your total shipment weight of <span
					className='blue'>{this.state.weight}</span> at <span
					className='blue'>{this.state.price}</span>…<br/>
					then the amount you will need to reimburse your buyers on Gfresh will be <span
					className='green'>${this.state.reimbursement}</span>
				</section>
				<hr/>

				<section className='explaination text-center'>
					<header>Explaination</header>
					<p>
						The allowed mortality for {this.state.product}s
						is {reimbursementParams.allowance * 100}%.
						Sellers reimburse {reimbursementParams.reimburse * 100}% of any amount that exceeds this {this.state.reimbursementType.toLowerCase()} allowance.
					</p>
				</section>
				<section className='terms text-center'>
					View all <a href='#'>Terms and Conditions</a>
				</section>
			</div>

		)
	}
});

module.exports = Result;
