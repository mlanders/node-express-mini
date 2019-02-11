const express = require('express');
const db = require('./data/db');
const server = express();
server.use(express.json());

server.get('/api/users', (req, res) => {
	db.find()
		.then(users => {
			res.status(200).json({ success: true, users });
		})
		.catch(({ code, message }) => {
			res.status(code).json({ success: false, message: message });
		});
});

server.listen(5000, () => {
	console.log('\n*** Running on port 5000 *** \n');
});

server.post('/api/users', (req, res) => {
	const user = req.body;
	db.insert(user)
		.then(id => {
			res.status(200).json({ success: true, id });
		})
		.catch(({ code, message }) => {
			res.status(code).json({ success: false, message });
		});
});
