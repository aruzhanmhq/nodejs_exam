const express = require("express");
const models = require("../Models");
const coursesRouter = express.Router();

coursesRouter.get('/', async (req, res) => {
    const courses = await models.Course.find({});
    res.status(200).send(courses);
});

coursesRouter.get('/user/:userId', async (req, res) => {
    let userId = req.params.userId;
    let user = await models.Car.findById(userId);
    res.status(200).send(user);
});

coursesRouter.post('/', async (req, res) => {
    let {title, owner, description} = req.body;

    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let createdAt = `${day}/${month}/${year}`;

    owner = JSON.parse(owner);

    let newCourse = new models.Course({title, owner, description, enrolledStudents: [], createdAt});

    await newCourse.save();

    res.status(201).send('Course created');
})

coursesRouter.post('/enroll', async (req, res) => {
    const {userId, courseId} = req.body;

    let course = await models.Car.findById(courseId);
    let user = await models.User.findById(userId);
    course.enrolledStudents.push(user)

    await models.Course.findByIdAndUpdate(courseId, course);
    res.status(201).send("Student enrolled");
})

module.exports = coursesRouter