var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
var Main = require('../components/Main');
var Calculator = require('../components/Calculator');
var Result = require('../components/Result');

var routes = (
	<Router history={hashHistory}>
	<Route path='/' component={Main}>
	<IndexRoute component={Calculator} />
	<Route path='calculator' header='Reimbursement Calculator' component={Calculator} />
	<Route path='result' header='Result' component={Result} />
	</Route>
	</Router>
);

module.exports = routes;
