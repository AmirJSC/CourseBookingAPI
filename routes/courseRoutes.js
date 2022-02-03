const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController');
const auth = require('../auth');


// Add a course
router.post('/', auth.verify, (req, res) => {
const userData = auth.decode(req.headers.authorization);
console.log(userData);
console.log(userData.isAdmin, "This is from courseRoutes");
courseController.addCourse(req.body, userData.isAdmin).then(resultFromController => res.send(resultFromController));
})

module.exports = router;