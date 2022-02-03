const Course = require('../models/Course');

module.exports.addCourse = (reqBody, isAdmin) => {
	if(isAdmin) {
		let newCourse = new Course({
			name: reqBody.name,
			description: reqBody.description,
			price: reqBody.price,
		});

		return newCourse.save().then((user, err) => {
			if(err) {
				return false;
			}
			else {
				return true;
			}
		})
	}
	return Promise.resolve('Not an Admin');
};