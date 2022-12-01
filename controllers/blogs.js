const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  // const blogObject = {
  //   title: request.body.title,
  //   author: request.body.author,
  //   url: request.body.url,
  //   likes: request.body.likes
  // }
  
  // if(!request.body.likes) {
  //   blogObject.likes = 0
  // }

  // const blog = new Blog(blogObject)

  if(!request.body.likes) {
    request.body.likes = 0
  }

  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter
