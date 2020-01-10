const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const usernameLenght = body.username === undefined ? 0 : body.username.length
    const passwordLenght = body.password === undefined ? 0 : body.password.length

    if (usernameLenght < 3 && passwordLenght < 3) {
      return response.status(400).json({
        error: 'Username and password are shorter than the minimum allowed length (3)'
      })
    } else if (usernameLenght < 3) {
      return response.status(400).json({
        error: 'Username is shorter than the minimum allowed length (3)'
      })
    } else if (passwordLenght < 3) {
      return response.status(400).json({
        error: 'Password is shorter than the minimum allowed length (3)'
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 })

  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter