import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
		};
	}

	componentDidMount() {
		this.getUsers();
	}

	getUsers = () => {
		axios.get('http://localhost:5000/api/users').then(res => {
			this.setState({ users: res.data.users });
		});
	};
	deleteUser = (e, id) => {
		e.preventDefault();
		axios.delete(`http://localhost:5000/api/users/${id}`).then(res => {
			console.log(res);
			axios.get('http://localhost:5000/api/users').then(res => {
				this.setState({ users: res.data.users });
			});
		});
	};

	render() {
		return (
			<div className="App">
				{this.state.users.map(user => (
					<div key={user.id} className="user">
						<h1>{user.name}</h1>
						<p>{user.bio}</p>
						<button onClick={e => this.deleteUser(e, user.id)}>Delete</button>
					</div>
				))}
			</div>
		);
	}
}

export default App;
