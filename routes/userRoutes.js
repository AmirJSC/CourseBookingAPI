const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

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

router.post('/details', (req, res) => {
	userController.getProfile(req.body).then(resultFromController => res.send(resultFromController))
});

module.exports = router;