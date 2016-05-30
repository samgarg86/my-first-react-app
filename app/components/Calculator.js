var React = require('react');
var Input = require('../components/Input');
var Validator = require('../utils/validator');

require('../styles/calculator.scss');

var Calculate = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function () {
		return {
			product: '',
			reimbursementType: '',
			weight: '',
			price: '',
			scenario: ''
		}
	},
	onProductChanged: function(e) {
		this.setState({
			product: e.target.value
		})
	},
	onReimbursementTypeChanged: function(e) {
		this.setState({
			reimbursementType: e.target.value
		})
	},
	onWeightChanged: function(e) {
		this.setState({
			weight: e.target.value
		})
	},
	onPriceChanged: function(e) {
		this.setState({
			price: e.target.value
		})
	},
	onScenarioChanged: function(e) {
		this.setState({
			scenario: e.target.value
		})
	},
	onSubmit: function(e) {
		e.preventDefault();

		var validateState = this.validate(this.state);
		if(Validator.validateAll(validateState)) {
			this.context.router.push({
				pathname: '/result',
				query: {
					product: this.state.product,
					reimbursementType: this.state.reimbursementType,
					weight: this.state.weight,
					price: this.state.price,
					scenario: this.state.scenario
				}
			});
		}
		else {
			alert("Please enter all the fields..");
		}
	},
	validate: function(state){
		return {
			product: state.product.length > 0,
			reimbursementType: state.reimbursementType.length > 0,
			price: /^\$\d+\.\d+$/.test(state.price),
			scenario: /\d+%$/.test(state.scenario),
			weight: /\d+kg$/.test(state.weight),
		}
	},
	render: function() {
		var valid = this.validate(this.state);
		return (
			<div className="calculator-container">
				<header className="text-center">
					Reimbursement Calculator
				</header>

				<div className="details text-left text-uppercase">Details</div>

				<form onSubmit={this.onSubmit}>
					<select className="form-control"
							onChange={this.onProductChanged}
							value={this.state.product}
							required>
						<option value="" disabled>Type of product</option>
						<option value="Lobster">Lobster</option>
						<option value="Crab">Crab</option>
					</select>

					<select className="form-control"
							onChange={this.onReimbursementTypeChanged}
							value={this.state.reimbursementType}
							required>
						<option value="" disabled>Type of reimbursement</option>
						<option value="Mortality">Mortality</option>
						<option value="Shrinkage">Shrinkage</option>
						<option value="Cancelled">Cancelled Order</option>
					</select>

					<Input valid={valid.weight}
						   className="form-control"
						   type="text"
						   placeholder="Shipment weight (eg, 500kg)"
						   onChange={this.onWeightChanged}
						value = {this.state.weight}/>

					<Input valid={valid.price}
						   className="form-control"
						   type="text"
						   placeholder="Unit price (eg, $10.00)"
						   onChange={this.onPriceChanged}
						value = {this.state.price}/>

					<Input valid={valid.scenario}
						   className="form-control"
						   type="text"
						   placeholder="Scenario (eg, 20%)"
						   onChange={this.onScenarioChanged}
						value = {this.state.scenario}/>

					<button type='submit'
						    className='btn btn-primary btn-block'>
						    Calculate
					</button>
				</form>
			</div>
		)
	}
});

module.exports = Calculate;
