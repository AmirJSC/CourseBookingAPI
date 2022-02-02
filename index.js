// Creating a server in express.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Connecting to MongoDB
mongoose.connect("mongodb+srv://AmirCastaneda:admindb@b145-zuitt-cluster.mjhg7.mongodb.net/course-booking?retryWrites=true&w=majority", {
	useUnifiedTopology: true,
	useNewUrlParser: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection Error"));
db.once('open', () => console.log('Successfully connected to MongoDB'));

app.listen(port, () => console.log(`Successfully connected to port ${port}`));