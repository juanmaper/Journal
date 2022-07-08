import axios from "axios"

const journalApi = axios.create({
  baseURL: 'https://vue-demos-2cb4d-default-rtdb.europe-west1.firebasedatabase.app',
})

// journalApi.interceptors.request.use( ( config ) => {

//   config.params = {
//     auth: localStorage.getItem('idToken')
//   }

//   console.log(config);

//   return config

// })

export default journalApi