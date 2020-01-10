const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

commentsRouter.get('/comments', async (request, response) => {
  const comments = await Comment
    .find({}).populate('blog', { blogname: 1, name: 1 })

  response.json(comments.map(comment => comment.toJSON()))
})

commentsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)

    const comment = new Comment({
      content: body.content,
      blog: request.params.id
    })

    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    response.status(201).json(savedComment.toJSON())
  } catch (exception) {
    next(exception)
  }
})

commentsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const commentBlogID = (await Comment.findById(request.params.id)).blog.toString()
    const blogID = decodedToken.id

    if (commentBlogID !== blogID) {
      return response.status(401).json({ error: 'Access denied' })
    }

    await Comment.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

commentsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  console.log(body)

  const comment = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Comment.findByIdAndUpdate(request.params.id, comment, { new: true })
    .populate('blog', { blogname: 1, name: 1 })
    .then(updatedComment => {
      response.status(200).json(updatedComment.toJSON())
    })
    .catch(error => next(error))
})

commentsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Comment.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = commentsRouter