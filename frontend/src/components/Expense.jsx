import React, { Component } from 'react';
import AppNav from './AppNav';
import '../App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Form, Button, FormGroup, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class Expense extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
			isLoading: true,
			expenses: [],
			categories: [],
			item: this.emptyItem
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
	}

	emptyItem = {
		id: '106',
		expensedate: new Date(),
		description: '',
		location: '',
		category: { id: 1, name: 'Travel' }
	};

	async remove(id) {
		await fetch(`/api/expenses/${id}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(() => {
			let updatedExpenses = [ ...this.state.expenses ].filter((i) => i.id !== id);
			this.setState({ expenses: updatedExpenses });
		});
	}

	async handleSubmit(event) {
		const item = this.state.item;

		await fetch(`/api/expenses`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(item)
		});

		event.preventDefault();
		this.props.history.push('/expenses');
	}

	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		let item = { ...this.state.item };
		item[name] = value;
		this.setState({ item });
		console.log(item);
	}

	handleCategoryChange(e) {
		const item = this.state.item;
		let categories = item.categories;
		var key = e.target.value;
		var value = this.state.categories.filter(function(i) {
			return i.id == e.target.value;
		});
		categories = value;
		item.categories = categories;
		this.setState({
			item
		});
		console.log(item);
	}

	handleDateChange(date) {
		let item = { ...this.state.item };
		item.expensedate = date;
		this.setState({ item });
		console.log(item);
	}

	async componentDidMount() {
		const response = await fetch('/api/categories');
		const body = await response.json();
		this.setState({ categories: body, isLoading: false });

		const responseExp = await fetch('/api/expenses');
		const bodyExp = await responseExp.json();
		this.setState({ expenses: bodyExp, isLoading: false });
	}

	render() {
		const title = <h3>Add Expense</h3>;
		const { categories } = this.state;
		const { expenses, isLoading } = this.state;

		if (isLoading) {
			return <div>Loading...</div>;
		}

		let rows = expenses.map((expense) => (
			<tr key={expense.id}>
				<td>{expense.description}</td>
				<td>{expense.location}</td>
				<td>
					<Moment date={expense.expensedate} format="YYYY-MM-DD" />
				</td>
				<td>{expense.category.name}</td>
				<td>
					<Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>
						Delete
					</Button>
				</td>
			</tr>
		));
		return (
			<div>
				<AppNav />
				<Container>
					{title}
					<Form onSubmit={this.handleSubmit}>
						<FormGroup>
							<label htmlFor="description">Title</label>
							<input type="text" name="description" id="description" onChange={this.handleChange} />
						</FormGroup>
						<FormGroup>
							<label htmlFor="category">Category</label>
							<select onChange={this.handleCategoryChange}>
								{categories.map((category, key) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</select>
						</FormGroup>
						<FormGroup>
							<label htmlFor="expenseDate">Expense Date</label>
							<DatePicker selected={this.state.item.expensedate} onChange={this.handleDateChange} />
						</FormGroup>
						<FormGroup>
							<label htmlFor="location">Location</label>
							<input type="text" name="location" id="location" onChange={this.handleChange} />
						</FormGroup>
						<FormGroup>
							<Button color="primary" type="submit">
								Save
							</Button>{' '}
							<Button color="secondary" tag={Link} to="/categories">
								Cancel
							</Button>
						</FormGroup>
					</Form>
				</Container>{' '}
				<Container>
					<h3>Expense List</h3>
					<Table className="mt-4">
						<thead>
							<tr>
								<th width="20%">Description</th>
								<th width="10%">Location</th>
								<th>DateTime</th>
								<th width="10%">Category</th>
								<th width="10%">Action</th>
							</tr>
						</thead>
						<tbody>{rows}</tbody>
					</Table>
				</Container>
			</div>
		);
	}
}

export default Expense;
