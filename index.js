const express = require('express');
const db = require('./data/db');
const server = express();
server.use(express.json());

server.post('/api/users', (req, res) => {
	const user = req.body;
	console.log(user);
	if (user.name === '' || user.bio === '') {
		res => {
			res.status(400).json({
				success: false,
				message: 'Please provide name and bio for the user.',
			});
		};
	}
	db.insert(user)

		.then(id => {
			res.status(200).json({ success: true, id });
		})
		.catch(({ code, message }) => {
			res.status(code).json({ success: false, message });
		});
});

server.get('/api/users', (req, res) => {
	db.find()
		.then(users => {
			res.status(200).json({ success: true, users });
		})
		.catch(({ code, message }) => {
			res.status(code).json({ success: false, message: message });
		});
});

server.get('/api/users/:id', (req, res) => {
	const { id } = req.params;
	db.findById(id)
		.then(user => {
			res.status(200).json({ success: true, user });
		})
		.catch(({ code, message }) => {
			res.status(code).json({ success: false, message: message });
		});
});

server.delete('/api/users/:id', (req, res) => {
	const { id } = req.params;
	db.remove(id)
		.then(user => {
			res.status(200).json({ success: true, user });
		})
		.catch(({ code, message }) => {
			res.status(code).json({ success: false, message: message });
		});
});

server.put('/api/users/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	db.update(id, changes)
		.then(updated => {
			res.status(200).jason({ success: true, updated });
		})
		.catch(({ code, message }) => {
			res.status(code).json({ success: false, message: message });
		});
});

server.listen(5000, () => {
	console.log('\n*** Running on port 5000 *** \n');
});
