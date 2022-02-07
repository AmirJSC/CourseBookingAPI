// [SECTION] Dependencies and Modules
	const express = require('express');
	const mongoose = require('mongoose');
	const cors = require('cors');
	const dotenv = require('dotenv')
	const userRoutes = require('./routes/userRoutes');
	const courseRoutes = require('./routes/courseRoutes');

// [SECTION] Environment variables setup
	// Store credentials to .env
	dotenv.config();
	const mongoDBConnectionString = process.env.MONGODB_CONNECTION_STRING;

// [SECTION] Server setup
	const app = express();
	const port = process.env.PORT || 3000;
	// Middlewares - executed after the server receives the request and before the server sends the response. 
	app.use(express.json());
	app.use(express.urlencoded({extended: true})); 
	app.use(cors());

mongoose.connect(mongoDBConnectionString, {
	useUnifiedTopology: true,
	useNewUrlParser: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection Error"));
db.once('open', () => console.log('Successfully connected to MongoDB'));

app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
app.listen(port, () => console.log(`Successfully connected to port ${port}`));