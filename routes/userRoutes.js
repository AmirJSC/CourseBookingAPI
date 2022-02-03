const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require("../auth");

// Check to see if there is already another user with the same email.
router.post('/checkEmail', (req, res) => {
	userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController))
});

router.post('/register', (req, res) => {
	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController))
});

router.post('/login', (req, res) => {
	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController))
});

// auth.verify is a middleware. Ensures user is logged in.
router.post("/details", auth.verify,  (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	userController.getProfile({userId : userData.id}).then(resultFromController => res.send(resultFromController));
});


module.exports = router;