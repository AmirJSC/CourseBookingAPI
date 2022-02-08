const Course = require('../models/Course');

module.exports.addCourse = async (data) => {
	if(data.isAdmin === true) {
		let newCourse = new Course({
			name: data.course.name,
			description: data.course.description,
			price: data.course.price,
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
	else {
		return 'Not an Admin';
	}
}

// If the return value of an async function is not explicitly a promise, it will be implicitly wrapped in a promise.
module.exports.getAllCourses = async (user) => {
	if(user.isAdmin === true) {
		return Course.find({}).then(result => {
			return result;
		});
	}
	else {
		return `${user.email} is not authorized`;
	}
}

module.exports.getAllActiveCourses = () => {
	return Course.find({isActive: true}).then(result => {
		return result;
	})
}

// Retrieve a specific course
module.exports.getCourse = (courseId) => {
	return Course.findById(courseId).then(result => {
		return result;
	})
}

module.exports.updateCourse = async (data) => {
	console.log(data);
	if(data.payload.isAdmin === true) {
		return Course.findById(data.courseId).then((result, err) => {
				result.name = data.updatedCourse.name;
				result.description = data.updatedCourse.description;
				result.price = data.updatedCourse.price;
			
				return result.save().then((updatedCourse, err) => {
					if(err) {
						return false;
					}
					else {
						return result;
					}
				})
		})
	}
	else {
		return false;
	}
}

module.exports.archiveCourse = async (data) => {
	if(data.payload.isAdmin === true) {
		return Course.findById(data.courseId).then((result, err) => {
			result.isActive = false;

			return result.save().then((archivedCourse, err) => {
				if(err) {
					return false;
				}
				else {
					return result;
				}
			})
		})
	}
	else {
		return 'Unauthorized user';
	}
}
