import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }



  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {

  const request = await axios.put(`${ baseUrl }/${id}`, newObject)
  return request.data
}

const deleteOne = async id => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, setToken, create, update, deleteOne }