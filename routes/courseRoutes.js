const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController');
const auth = require('../auth');


// Add a course
router.post('/', auth.verify, (req, res) => {
const data = {
	course: req.body,
	isAdmin: auth.decode(req.headers.authorization).isAdmin
};
courseController.addCourse(data).then(resultFromController => res.send(resultFromController));
})

// Retrieve all courses 
router.get('/all', auth.verify, (req, res) => {
	const data = auth.decode(req.headers.authorization);
	courseController.getAllCourses(data).then(resultFromController => res.send(resultFromController));
})

// Retrieve active courses
router.get('/', (req, res) => {
	courseController.getAllActiveCourses().then(resultFromController => res.send(resultFromController))
});

router.get('/:courseId', (req, res) => {
	courseController.getCourse(req.params.courseId).then(resultFromController => res.send(resultFromController))
});

router.put('/:courseId', auth.verify, (req, res) => {
	const data = {
		courseId: req.params.courseId,
		payload: auth.decode(req.headers.authorization),
		updatedCourse: req.body
	};
	courseController.updateCourse(data).then(resultFromController => res.send(resultFromController))
});

router.put('/:courseId/archive', auth.verify, (req, res) => {
	const data = {
		courseId: req.params.courseId,
		payload: auth.decode(req.headers.authorization)
	};
	courseController.archiveCourse(data).then(resultFromController => res.send(resultFromController))
});

module.exports = router;