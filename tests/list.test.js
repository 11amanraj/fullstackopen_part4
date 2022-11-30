const listHelper = require('../utils/list_helper')

test('dummy return one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const oneList = [
    {
      'title': 'Way of Kings',
      'author': 'Brandon Sanderson',
      'url': 'Whatever',
      'likes': 20000,
      'id': '6385c6b018f22df7e5e8cc54'
    }
  ]
   
  test('if list contains only one blog, equals the likes of that blog', () => {
    const result = listHelper.totalLikes(oneList)
    expect(result).toBe(20000)
  }) 
})

describe('favoriteBlogs', () => {
  const list = [
    {
      'title': 'Way of Kings',
      'author': 'Brandon Sanderson',
      'url': 'Whatever',
      'likes': 20000,
      'id': '6385c6b018f22df7e5e8cc54'
    },
    {
      'title': 'The Hobbit',
      'author': 'JRR Tolkien',
      'url': 'www.google.com',
      'likes': 30000,
      'id': '6385c6d618f22df7e5e8cc57'
    },
    {
      'title': 'Deadhouse Gates',
      'author': 'Steven Erickson',
      'url': 'www.malazan.com',
      'likes': 15000,
      'id': '6385c87c7a1339f0e967c80c'
    },
    {
      'title': 'Horus Heresy',
      'author': 'Dan Abnett',
      'url': 'www.warhammer.com',
      'likes': 5000,
      'id': '6385cccbed1b7fbf96862999'
    },
    {
      'title': 'Dead Rites',
      'author': 'Jim Butcher',
      'url': 'www.dresdenfiles.com',
      'likes': 5000,
      'id': '6385d08cb373f7f178bff582'
    },
    {
      'title': 'Game of Thrones',
      'author': 'GRR Martin',
      'url': 'www.asongoficeandfire.com',
      'likes': 30000,
      'id': '6385d2e2cfab45040e8e19b7'
    }
  ]

  // tests for MULTIPLE objects with maximum like
  test('list of all blogs with maximum likes', () => {
    const result = listHelper.favoriteBlog(list)
    expect(result).toEqual([{
      'title': 'The Hobbit',
      'author': 'JRR Tolkien',
      'likes': 30000,
    },
    {
      'title': 'Game of Thrones',
      'author': 'GRR Martin',
      'likes': 30000,
    }])
  })
})

describe('mostBlogs', () => {
  const list = [
    {
      'title': 'Way of Kings',
      'author': 'Brandon Sanderson',
      'url': 'Whatever',
      'likes': 20000,
      'id': '6385c6b018f22df7e5e8cc54'
    },
    {
      'title': 'The Hobbit',
      'author': 'JRR Tolkien',
      'url': 'www.google.com',
      'likes': 30000,
      'id': '6385c6d618f22df7e5e8cc57'
    },
    {
      'title': 'Deadhouse Gates',
      'author': 'Steven Erickson',
      'url': 'www.malazan.com',
      'likes': 15000,
      'id': '6385c87c7a1339f0e967c80c'
    },
    {
      'title': 'Horus Heresy',
      'author': 'Dan Abnett',
      'url': 'www.warhammer.com',
      'likes': 5000,
      'id': '6385cccbed1b7fbf96862999'
    },
    {
      'title': 'Dead Rites',
      'author': 'Jim Butcher',
      'url': 'www.dresdenfiles.com',
      'likes': 5000,
      'id': '6385d08cb373f7f178bff582'
    },
    {
      'title': 'Game of Thrones',
      'author': 'GRR Martin',
      'url': 'www.asongoficeandfire.com',
      'likes': 30000,
      'id': '6385d2e2cfab45040e8e19b7'
    },
    {
      'title': 'Well of Ascension',
      'author': 'Brandon Sanderson',
      'url': 'www.mistborn.com',
      'likes': 8000,
      'id': '6385c6b018f22df7e5e8cc45'
    }
  ]

  // tests for SINGLE author with most blogs, ignore other authors with same number
  test('list of authors with most blogs', () => {
    const result = listHelper.mostBlog(list)
    expect(result).toEqual({
      author: 'Brandon Sanderson',
      blogs: 2
    })
  })
})
