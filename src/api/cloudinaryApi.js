import axios from "axios"

const cloudinaryApi = axios.create({
  baseURL: 'https://api.cloudinary.com/v1_1/ds3yf4btu/image/upload'
})

export default cloudinaryApi