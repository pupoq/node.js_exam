const schemas = require('./Schemas')
const mongoose = require('mongoose')

const User = new mongoose.model("User", schemas.userSchema)
const Course = new mongoose.model("Course", schemas.courseSchema)

module.exports = {
    User,Course
}