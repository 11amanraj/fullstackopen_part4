const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./blog_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initailBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('correct number of blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('Checks if id property exists', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('HTTP POST requests creates a new blog post', async () => { 
  const blog = {
    'title': 'Blood Rites',
    'author': 'Jim Butcher',
    'url': 'www.dresdenfiles.com',
    'likes': 15000
  }  
  
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(3)
  expect(response.body[2]).toMatchObject(blog)
})

afterAll(() => {
  mongoose.connection.close()
})
