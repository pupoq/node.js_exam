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

    owner = JSON.parse(owner)

    let newCourse = new models.Post({
        title, 
        description, 
        owner, 
        createdAt,
        enrolledStudents
    })

    newCourse.save()

    res.status(201).send("Post created")
})


module.exports = coursesRouter