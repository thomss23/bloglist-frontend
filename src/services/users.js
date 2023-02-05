import axios from 'axios'
const baseUrl = '/api/users'


const getAllUsers = async () => {
  const request = axios.get(baseUrl)
  console.log(request.then(response => response.data))
  return request.then(response => response.data)
}

export { getAllUsers }