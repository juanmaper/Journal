import axios from "axios"

const authApi = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
  params: {
    key: 'AIzaSyBZn-GbY2C1JH1CR2l0nYT9ntJETetaeG4'
  }
})

export default authApi