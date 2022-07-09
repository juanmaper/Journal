import cloudinaryApi from "@/api/cloudinaryApi"



const uploadImage = async ( file ) => {

  if ( !file ) return

  try {
    
    const formData = new FormData()
    formData.append('upload_preset', 'vue-course')
    formData.append('file', file)

    const { data } = await cloudinaryApi.post('', formData)

    return data.secure_url


  } catch (error) {
    console.error('Image loading error, check logs')
    console.log(error)
    return null
  }

}

export default uploadImage