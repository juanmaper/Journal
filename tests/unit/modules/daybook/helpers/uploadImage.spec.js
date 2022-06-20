import 'setimmediate'
import cloudinary from "cloudinary"
import axios from "axios"

import uploadImage from "@/modules/daybook/helpers/uploadImage"

cloudinary.config({
  cloud_name: 'ds3yf4btu',
  api_key: '625791121868461',
  api_secret: '1QOFT2hMFQFyxfYSnLj50bxOkm0'
})

describe('uploadImage tests', () => {
  
  test('should load a file and return the url', async( done ) => {
    
    /*
      In general, API calls should not be used in tests. It would be better to simulate them using a mock, as they slow down
      the tests and can consume rapidly the limit of petitions from a website, if this limit exists.
      This is only for academic purposes and because I want to test that the image is indeed uploaded to cloudinary
    */
    const { data } = await axios.get('https://res.cloudinary.com/ds3yf4btu/image/upload/v1655217432/rbo4opu2ypy3tiukreqj.jpg', {
      responseType: 'arraybuffer'
    })

    const file = new File([ data ], 'pic.jpg' )

    const url = await uploadImage( file )

    expect( typeof url ).toBe('string')

    // Take the ID to delete the pic in cloudinary
    const segments = url.split('/')
    const imageId = segments[ segments.length - 1 ].replace('.jpg', '')
    
    cloudinary.v2.api.delete_resources( imageId, {}, () => {
      done()
    })

  })

})