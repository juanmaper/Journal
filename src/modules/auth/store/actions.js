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