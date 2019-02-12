import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			name: '',
			bio: '',
		};
	}

	componentDidMount() {
		this.getUsers();
	}
	handleChanges = e => {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

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

	addUser = e => {
		e.preventDefault();
		let user = { name: this.state.name, bio: this.state.bio };
		axios.post(`http://localhost:5000/api/users/`, user).then(res => {
			console.log(res);
			axios.get('http://localhost:5000/api/users').then(res => {
				this.setState({ users: res.data.users });
			});
		});
	};

	render() {
		return (
			<div className="App">
				<form
					onSubmit={e => {
						this.addUser(e);
					}}>
					<input
						name="name"
						required
						value={this.state.name}
						placeholder="Name"
						onChange={e => this.handleChanges(e)}
					/>
					<input
						name="bio"
						required
						value={this.state.bio}
						placeholder="Bio"
						onChange={e => this.handleChanges(e)}
					/>
					<button>Submit</button>
				</form>
				<div className="users">
					{this.state.users.map(user => (
						<div key={user.id} className="user">
							<h1>{user.name}</h1>
							<p>{user.bio}</p>
							<button onClick={e => this.deleteUser(e, user.id)}>Delete</button>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default App;
