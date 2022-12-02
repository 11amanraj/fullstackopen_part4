const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if(!request.body.title || !request.body.url) {
    return response.status(400).json({error: 'title and url are required'})
  } else if(!request.body.likes) {
    request.body.likes = 0
  }
  
  // const user = await User.findById(request.body.userId)

  //selects first user from database
  const res = await User.find({})
  const user = res[0]
  
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
