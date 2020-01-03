const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {"username": "tester", "name": "Donald Tester", "id": "5e0ccd56a452460c3cfc912c"},
    id: "5e0cce26e3afd74ec49e30fe"
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {"username": "tester", "name": "Donald Tester", "id": "5e0ccd56a452460c3cfc912c"},
    id: "5e0cce26e3afd74ec49e30fe"
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: {"username": "tester", "name": "Donald Tester", "id": "5e0ccd56a452460c3cfc912c"},
    id: "5e0cce26e3afd74ec49e30fe"
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: {"username": "tester", "name": "Donald Tester", "id": "5e0ccd56a452460c3cfc912c"},
    id: "5e0cce26e3afd74ec49e30fe"
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: {"username": "tester", "name": "Donald Tester", "id": "5e0ccd56a452460c3cfc912c"},
    id: "5e0cce26e3afd74ec49e30fe"
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: {"username": "tester", "name": "Donald Tester", "id": "5e0ccd56a452460c3cfc912c"},
    id: "5e0cce26e3afd74ec49e30fe"
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {};

export default { getAll, setToken }


