import React from 'react';
import AppNav from './AppNav';

const Home = () => (
	<div>
		<AppNav />
		<br />
		<h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>Welcome to Expense Tracking Application</h1>
	</div>
);

export default Home;
