const User = require('../models/User');
const bcrypt = require('bcrypt');
const auth = require('../auth.js');

module.exports.checkEmailExists = (reqBody) => {
	return User.find({email: reqBody.email}).then(result => {
		if(result.length > 0) {
			return true;
		}
		else {
			return false;
		}
	})
}

module.exports.registerUser = (reqBody) => {

	let newUser = new User({
		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		email: reqBody.email,
		mobileNo: reqBody.mobileNo,
		password: bcrypt.hashSync(reqBody.password, 10),
		isAdmin: reqBody.isAdmin
	});

	return newUser.save().then((user, err) => {
		if(err) {
			console.log(err);
			return false;
		}
		else {
			return user;
		}
	})
}

module.exports.loginUser = (reqBody) => {

	return User.findOne({email: reqBody.email}).then(result => {
		if(result == null) {
			return false;
		}
		else {
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);
			if(isPasswordCorrect) {
				return {access: auth.createAccessToken(result)};
			}
		}
	})
}


module.exports.getProfile = (data) => {
	
	return User.findById(data.userId).then(result => {
		result.password = "";
		return result;
	});
}
