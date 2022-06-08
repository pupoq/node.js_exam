const express = require('express')
const models = require('../Modules')
const coursesRouter = express.Router()

coursesRouter.get('/', async (req, res) => {
    const courses = await models.Course.find({})
    res.status(200).send(courses)
})


coursesRouter.post('/', async (req,res) => {
    let {title, owner, description} = req.body

    let currentDate = new Date()
    let day = currentDate.getDate()
    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()
    let createdAt = `${day}/${month}/${year}`

    

    let newCourse = new models.Course({
        title, 
        description, 
        owner, 
        createdAt,
        enrolledStudents: []
    })

    newCourse.save()

    res.status(201).send("Post created")
})

coursesRouter.post('/enroll', async (req, res) => {
    const { userId, courseId } = req.body;

    let car = await models.Car.findById(courseId);

    let user = await models.User.findById(userId);
    user.cars.push(car);

    await models.User.findByIdAndUpdate(userId, user);
    res.send("car added");
});

module.exports = coursesRouter