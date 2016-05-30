var React = require('react');

var Input = React.createClass({
	getInitialState: function(){
		// we don't want to validate the input until the user starts typing
		return {
			validationStarted: false
		};
	},
	debounce: function(fun, mil) {
		var timer;
		return function() {
			clearTimeout(timer);
			timer = setTimeout(function() {
				fun();
			}, mil);
		};
	},

	prepareToValidate: function(){},
	componentWillMount: function(){
		var startValidation = function(){
			this.setState({
				validationStarted: true
			})
		}.bind(this);

		// if non-blank value: validate now
		if (this.props.value) {
			startValidation();
		}
		// wait until they start typing, and then stop
		else {
			this.prepareToValidate = this.debounce(startValidation, 1000);
		}
	},

	handleChange: function(e){
		if (!this.state.validationStarted) {
			this.prepareToValidate();
		}
		this.props.onChange && this.props.onChange(e);
	},

	render: function(){
		var className = "";
		if (this.state.validationStarted) {
			className = (this.props.valid ? "valid" : "invalid");
		}

		return (
			<input
				className={className + ' ' + this.props.className}
				type={this.props.type}
				placeholder={this.props.placeholder}
				onChange={this.handleChange}
				value = {this.props.value} />
		);
	}
});

module.exports = Input;
