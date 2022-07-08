import authApi from "@/api/authApi"

// export const myAction = async({ commit }) => {


// }

export const createUser = async({ commit }, user ) => {

  const { username, email, password } = user

  try {
    
    const { data } = await authApi.post(':signUp', { email, password, volverSecureToken: true })
    const { idToken, refreshToken } = data

    await authApi.post(':update', { displayName: username, idToken })

    delete user.password
    commit('loginUser', { user, idToken, refreshToken })

    return { ok: true }

  } catch (error) {
    return { ok: false, message: error.response.data.error.message }
  }

}

export const signInUser = async({ commit }, user ) => {

  const { email, password } = user

  try {
    
    const { data } = await authApi.post(':signInWithPassword', { email, password, volverSecureToken: true })
    const { displayName, idToken, refreshToken } = data

    user.username = displayName

    delete user.password
    commit('loginUser', { user, idToken, refreshToken })

    return { ok: true }

  } catch (error) {
    return { ok: false, message: error.response.data.error.message }
  }

}

export const checkAuthStatus = async({ commit }) => {

  const idToken = localStorage.getItem('idToken')
  const refreshToken = localStorage.getItem('refreshToken')

  if ( !idToken ) {
    commit('logout')
    return { ok: false, message: 'No token provided' }
  }

  try {
    
    const { data } = await authApi.post(':lookup', { idToken })
    const { displayName: username, email } = data.users[0]

    const user = {
      username,
      email
    }

    commit('loginUser', { user, idToken, refreshToken })

  } catch (error) {
    commit('logout')
    return { ok: false, message: error.response.data.error.message }
  }

}