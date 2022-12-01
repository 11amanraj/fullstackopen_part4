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

describe('GET request', async () => {
  test('correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
  })
})

describe('Check Property', async () => {
  test('Checks if id property exists', async () => {
    const response = await api.get('/api/blogs')
  
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('POST request', () => {
  test('HTTP POST requests creates a new blog post', async () => {
    const res = await api.get('/api/blogs')
    const intialLength = res.body.length
  
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
    expect(response.body).toHaveLength(intialLength+1)
    expect(response.body[intialLength]).toMatchObject(blog)
  })
  
  test('if likes property is missing returns provide default value of 0', async () => {
    const res = await api.get('/api/blogs')
    const intialLength = res.body.length
  
    const blog = {
      'title': 'Changes',
      'author': 'Jim Butcher',
      'url': 'www.dresdenfiles.com',
    }
    
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    expect(response.body[intialLength].likes).toBe(0)
  })
  
  test('if title or url property is missing returns error 400', async () => {
    const blog = {
      'author': 'Jim Butcher',
      'likes': 15000
    }
    
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  }, 10000)
})

describe('DELETE request', () => {
  test('deleting a blog post', async () => {
    const res = await api.get('/api/blogs')
    const initialLength = res.body.length
    const blogToBeDeleted = res.body[0]
    
    await api
      .delete(`/api/blogs/${blogToBeDeleted.id}`)
      .expect(204)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialLength-1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
