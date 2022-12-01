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
})
