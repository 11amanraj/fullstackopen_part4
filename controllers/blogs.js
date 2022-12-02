const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    
  response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')  
  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)  
  }  return null
}

blogsRouter.post('/', async (request, response) => {
  if(!request.body.title || !request.body.url) {
    return response.status(400).json({error: 'title and url are required'})
  } else if(!request.body.likes) {
    request.body.likes = 0
  }
  
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token missing'})
  }
  
  const user = await User.findById(decodedToken.id)
  
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
