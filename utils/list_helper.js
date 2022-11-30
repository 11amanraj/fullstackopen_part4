const _ = require('lodash')

const dummy = (blogs) => {
  if(blogs) return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const maxLikes = Math.max(...likes)
  
  const index = []
  for(let i=0; i < likes.length; i++) {
    (likes[i] === maxLikes) && index.push(i)
  }

  console.log(index)

  return index.map(i => {
    return {
      title: blogs[i].title,
      author: blogs[i].author,
      likes: blogs[i].likes
    }
  })
}

const mostBlog = (blogs) => {
  const [authors, number] = _.zip(...(_.toPairs(_.countBy(blogs, 'author'))))
  const index = number.indexOf(Math.max(...number))
  
  return {
    author: authors[index],
    blogs: number[index]
  }
}

const mostLikes = (blogs) => {
  const newList = blogs.map(item => ({
    author: item.author,
    likes: item.likes
  }))
  const sortedList = _.groupBy(newList, 'author')
  const authors = []
  const likes = []
  
  _.forOwn(sortedList, (value, key) => {
    authors.push(key)

    if(value.length === 1) {
      likes.push(value[0].likes)
    } else {
      likes.push(value.reduce((sum, item) => {
        return sum + item.likes
      }, 0))
    }
  })
  
  const index = likes.indexOf(Math.max(...likes))
  return {
    author: authors[index],
    likes: likes[index]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes
}