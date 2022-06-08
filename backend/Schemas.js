const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    fullName: String,
    login: String,
    password: String,
    roleId: Number
})

const courseSchema = new Schema({
    title: String,
    description: String,
    owner: String,
    enrolledStudents: Array,
    createdAt: Date
})

module.exports = {
    userSchema, 
    courseSchema
}