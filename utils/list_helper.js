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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}