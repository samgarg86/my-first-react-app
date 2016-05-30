var React = require('react');
require('../styles/main.scss');

var Main = React.createClass({
	render: function() {
		return (
			<div className='container-fluid x'>
				{this.props.children}
			</div>
		)
	}
});

module.exports = Main;
