const express = require('express')
const models = require('../Modules')
const usersRouter = express.Router()

usersRouter.get('/', async (req, res) => {
    const users = await models.User.find({})
    res.status(200).send(users)
})

usersRouter.post('/', async (req, res) => {
    const {fullName, login, password, roleId} = req.body

    let newUser = new models.User({fullName, login, password, roleId})

    await newUser.save()

    res.status(200).send('User created')
})

usersRouter.post('/login', async (req, res) => {
    console.log(req.body)
    const {login, password} = req.body

    let user = await models.User.findOne({login: login, password: password})

    if(user !== null){
        res.status(200).send(user)
    } else {
        res.status(401).send(null)
    }
})

module.exports = usersRouter