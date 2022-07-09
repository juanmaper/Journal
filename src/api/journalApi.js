import axios from "axios"

const journalApi = axios.create({
  baseURL: 'https://vue-demos-2cb4d-default-rtdb.europe-west1.firebasedatabase.app',
})

// This could be done in the above part I think, but the using of interceptor to show it is interesting. 
// Anyway, everything is commented as firebase does not get configured properly in terms of rules and auth

journalApi.interceptors.request.use( ( config ) => {

  config.params = {
    auth: localStorage.getItem('idToken')
  }

  return config

})

export default journalApi