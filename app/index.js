var React = require('react');
var ReactDom = require('react-dom');
var routes = require('./config/routes')

require('./styles/base.scss');

ReactDom.render(
	routes,
	document.getElementById('app')
);
