const express = require('express');
const cors = require('cors');
const db = require('./data/db');
const server = express();
server.use(express.json());
server.use(cors());

server.post('/api/users', (req, res) => {
	const { name, bio } = req.body;
	const newUser = { name, bio };
	if (!name || !bio) {
		return res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
	}
	db.insert(newUser)

		.then(id => {
			db.findById(id.id)
				.then(user => {
					res.status(201).json({ success: true, user });
				})
				.catch(({ code, message }) => {
					res.status(code).json({ success: false, message: message });
				});
		})
		.catch(err => {
			res.status(500).json({
				success: false,
				message: 'There was an error while saving the user to the database',
			});
		});
});

server.get('/api/users', cors(), (req, res) => {
	db.find()
		.then(users => {
			res.status(200).json({ success: true, users });
		})
		.catch(err => {
			res.status(500).json({
				success: false,
				message: 'The users information could not be retrieved.',
			});
		});
});

server.get('/api/users/:id', (req, res) => {
	const { id } = req.params;
	db.findById(id)
		.then(user => {
			if (user) {
				res.status(200).json({ success: true, user });
			} else {
				res.status(404).json({
					success: false,
					message: 'The user with the specified ID does not exist.',
				});
			}
		})
		.catch(err => {
			res.status(500).json({
				success: false,
				message: 'The user information could not be retrieved.',
			});
		});
});

server.delete('/api/users/:id', (req, res) => {
	const { id } = req.params;
	db.findById(id)
		.then(user => {
			if (user) {
				db.remove(id)
					.then(deleted => {
						res.status(200).json({ success: true, user });
					})
					.catch(err => {
						res.status(500).json({
							success: false,
							message: 'The user could not be removed',
						});
					});
			} else {
				res.status(404).json({
					success: false,
					message: 'The user with the specified ID does not exist.',
				});
			}
		})
		.catch(({ code, message }) => {
			res.status(code).json({ success: false, message: message });
		});
});

server.put('/api/users/:id', (req, res) => {
	const { id } = req.params;
	const { name, bio } = req.body;
	const changes = req.body;
	if (!name || !bio) {
		return res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
	}

	db.findById(id)
		.then(user => {
			if (user) {
				db.update(id, changes)
					.then(updated => {
						db.findById(id)
							.then(user => {
								if (user) {
									res.status(200).json({ success: true, user });
								} else {
									res.status(404).json({
										success: false,
										message: 'The user with the specified ID does not exist.',
									});
								}
							})
							.catch(err => {
								res.status(500).json({
									success: false,
									message: 'The user information could not be retrieved.',
								});
							});
					})
					.catch(({ code, message }) => {
						res.status(code).json({ success: false, message: message });
					});
			} else {
				res.status(404).json({
					success: false,
					message: 'The user with the specified ID does not exist.',
				});
			}
		})
		.catch(err => {
			res.status(500).json({
				success: false,
				message: 'The user information could not be retrieved.',
			});
		});
});

server.listen(5000, () => {
	console.log('\n*** Running on port 5000 *** \n');
});
