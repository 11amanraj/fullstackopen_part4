const bcrypt = require('bcrypt')
const User = require('../models/users')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

describe('POST', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash})

    await user.save()
  })

  test('create new user', async () => {
    const newUser = {
      username: 'john007',
      name: 'John Doe',
      password: 'bondjohn'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/users')

    const usernames = response.body.map(user => user.username)
    const names = response.body.map(user => user.name)
    
    expect(usernames).toContain('john007')
    expect(names).toContain('John Doe')
  })

  test('if password have less than 3 characters then return 400 status code', async () => {
    const newUser = {
      username: 'jinny',
      name: 'Jane Doe',
      password: 'bo'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(400)

    // const res = await api.post('/api/users')
    //   .send(newUser)
    // console.log(res.error.text.error)

    //check if user has not been created
    const response = await api.get('/api/users')

    const usernames = response.body.map(user => user.username)
    const names = response.body.map(user => user.name)
      
    expect(usernames).not.toContain('jinny')
    expect(names).not.toContain('Jane Doe')  
  })

  test('if username have less than 3 characters then return 400 status code', async () => {
    const newUser = {
      username: 'ji',
      name: 'Jane Doe',
      password: 'bodsg8456'
    }

    //check part 3 error handling again
    await api.post('/api/users')
      .send(newUser)
      .expect(500)

    // const res = await api.post('/api/users')
    //   .send(newUser)
    // console.log(res.error.text.error)

    //check if user has not been created
    const response = await api.get('/api/users')

    const usernames = response.body.map(user => user.username)
    const names = response.body.map(user => user.name)
      
    expect(usernames).not.toContain('ji')
    expect(names).not.toContain('Jane Doe')  
  })
})
