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
			id: '',
			isEditing: false,
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

	updateUser = (e, user) => {
		e.preventDefault();
		console.log('update user');
		this.setState({
			name: user.name,
			bio: user.bio,
			id: user.id,
			isEditing: true,
		});
	};
	submitUser = e => {
		console.log('submitUser');
		e.preventDefault();
		// let id = this.state.id;
		let changed = { name: this.state.name, bio: this.state.bio };
		axios.put(`http://localhost:5000/api/users/${this.state.id}`, changed).then(res => {
			console.log('put response', res);
			axios.get('http://localhost:5000/api/users').then(res => {
				this.setState({ users: res.data.users });
			});
		});
		this.setState({ isEditing: false });
	};
	render() {
		return (
			<div className="App">
				<form>
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
					<button
						onSubmit={e => {
							this.state.isEditing ? this.submitUser(e) : this.addUser(e);
						}}>
						{this.state.isEditing ? 'Submit Edit' : 'Add User'}
					</button>
				</form>
				<div className="users">
					{this.state.users.map(user => (
						<div key={user.id} className="user">
							<h1>{user.name}</h1>
							<p>{user.bio}</p>
							<button onClick={e => this.deleteUser(e, user.id)}>Delete</button>
							<button onClick={e => this.updateUser(e, user)}>Edit</button>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default App;
