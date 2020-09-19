import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Category from './components/Category';
import Expense from './components/Expense';
import Home from './components/Home';

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/" exact={true} component={Home} />
					<Route path="/categories" exact={true} component={Category} />
					<Route path="/expenses" exact={true} component={Expense} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
