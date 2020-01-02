const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((sum, b) => sum + b.likes, 0)

  return blogs.length === 0
    ? 0
    : sum
}

const favoriteBlog = (blogs) => {
  const blogWithMostLikes = blogs.reduce(
    (prev, current) => (prev.likes > current.likes) ? prev : current
  )
  const { title, author, likes, ...rest } = blogWithMostLikes
  const partialBlog = { title, author, likes }
  return partialBlog
}

const mostBlogs = (blogs) => {
  const blogAmounts = blogs.reduce((amount, blog) => {
    amount[blog.author] = (amount[blog.author] || 0) + 1
    return amount
  }, {})
  const maxBlogAmount = Math.max(...Object.values(blogAmounts))
  const maxBlogAmountAuthor = (Object.keys(blogAmounts).filter(k => blogAmounts[k] === maxBlogAmount)).toString()
  return { 'author':maxBlogAmountAuthor, 'blogs':maxBlogAmount }
}

const mostLikes = (blogs) => {

  const authorAndLikes = () => {
    const authorsAndLikes = []
    const authors = [...new Set(blogs.map(blog => blog.author))]

    const getAuthorAndLikes = (author) => {
      let likes = blogs.reduce((a, b) => parseInt(a + (b.author === author ? b.likes : 0 )), [])
      return { author:author, likes:likes }
    }

    for(let author of authors) { authorsAndLikes.push(getAuthorAndLikes(author)) }

    return authorsAndLikes.reduce((prev, current) =>
      (prev.likes > current.likes) ? prev : current
    )
  }

  return authorAndLikes()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}