import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blog'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async (id) => {
  const response = await axios.get(`${ baseUrl }/${id}`)
  return response.data
}

const create = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(`${ baseUrl }/${id}/comments`, newObject, config)
  return response.data
}

export default { getAll, setToken, create }