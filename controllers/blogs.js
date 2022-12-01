const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if(!request.body.title || !request.body.url) {
    return response.status(400).json({error: 'title missing'})
  } else if(!request.body.likes) {
    request.body.likes = 0
  }
    
  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result) 
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.json(updatedBlog)
  response.status(200).end()
})

module.exports = blogsRouter
