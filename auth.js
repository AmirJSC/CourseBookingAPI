const jwt = require('jsonwebtoken');
const secret = 'CourseBookingAPI';

// Token Creation
module.exports.createAccessToken = (user) => {

	// This will be the payload. Make sure it doesn't include the passwords.
	// This should be concise so it doesn't consume a lot of bandwidth.
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};

	return jwt.sign(data, secret, {});
};

module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;

	if(typeof token !== "undefined") {
		console.log(token);
		// token = Bearer askfmafmwff
		token = token.slice(7, token.length);
		return jwt.verify(token, secret, (err, data) => {
			if(err) {
				return res.send({auth: "failed"});
			}
			else {
				next();
			}
		})
	}
	else {
		return res.send({auth: "failed"});
	}
};

// Token Decryption
module.exports.decode = (token) => {
	if(typeof token !== "undefined") {
		token = token.slice(7, token.length);
		return jwt.verify(token, secret, (err, data) => {
			if(err) {
				return null;
			} 
			else {
				return jwt.decode(token, {complete: true}).payload
			}
		})
	}
	else {
		return null;
	}
}