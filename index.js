const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const app = express();
// process.env.PORT for when it is deployed.
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose.connect("mongodb+srv://AmirCastaneda:admindb@b145-zuitt-cluster.mjhg7.mongodb.net/course-booking?retryWrites=true&w=majority", {
	useUnifiedTopology: true,
	useNewUrlParser: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection Error"));
db.once('open', () => console.log('Successfully connected to MongoDB'));

app.use('/users', userRoutes);
app.listen(port, () => console.log(`Successfully connected to port ${port}`));