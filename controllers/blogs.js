const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    
  response.json(blogs)
})

//using userExtractor here instead of app.js allows to exclude GET route from token requirement
blogsRouter.post('/', userExtractor , async (request, response) => {
// blogsRouter.post('/', async (request, response) => {
  if(!request.body.title || !request.body.url) {
    return response.status(400).json({error: 'title and url are required'})
  } else if(!request.body.likes) {
    request.body.likes = 0
  }

  const user = request.user
  
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog) 
})

blogsRouter.delete('/:id', userExtractor , async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if(!blog) {
    response.status(400).json({ error: 'blog has already been removed'}) 
  } else if(user._id.toString() === blog.user.toString()) {
    await Blog
      .findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'unauthorized access'})
  }
})

blogsRouter.put('/:id', userExtractor , async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if(!blog) {
    response.status(400).json({ error: 'blog has already been removed'}) 
  } else {
    const updatedBlog = await Blog
      .findByIdAndUpdate(request.params.id, request.body)
    response.json(updatedBlog)
    response.status(204).end()
  }
})

module.exports = blogsRouter
