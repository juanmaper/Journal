
import axios from 'axios'
import createVuexStore from '../../../mocks-data/mock-store'

describe('Vuex: auth module tests', () => {
  
  test('estado inicial', () => {
        
    const store = createVuexStore({
        status: 'authenticating', // 'authenticated','not-authenticated', 'authenticating'
        user: null,
        idToken: null,
        refreshToken: null
    })

    const { status, user, idToken, refreshToken } = store.state.auth
    
    expect( status ).toBe( 'authenticating' )
    expect( user ).toBe( null )
    expect( idToken ).toBe( null )
    expect( refreshToken ).toBe( null )
  })

  // Mutations
  test('Mutation: loginUser', () => {
        
    const store = createVuexStore({
        status: 'authenticating', // 'authenticated','not-authenticated', 'authenticating'
        user: null,
        idToken: null,
        refreshToken: null
    })

    const payload = {
        user: { username: 'User', email: 'user@gmail.com' },
        idToken: 'ABC-123',
        refreshToken: 'XYZ-123'
    }

    store.commit('auth/loginUser', payload )

    const { status, user, idToken, refreshToken } = store.state.auth
    
    expect( status ).toBe( 'authenticated' )
    expect( user ).toEqual( { username: 'User', email: 'user@gmail.com' } )
    expect( idToken ).toBe( 'ABC-123' )
    expect( refreshToken ).toBe( 'XYZ-123' )

  })

  test('Mutation: logout ', () => {
    
    const store = createVuexStore({
      status: 'authenticated', // 'authenticated','not-authenticated', 'authenticating'
      user: { username: 'user1', email: 'example@example.com' },
      idToken: '123456',
      refreshToken: 'refresh'
    })

    localStorage.setItem('idToken', 'localStorageToken' )
    localStorage.setItem('refreshToken', 'localStorageRefreshToken' )

    store.commit('auth/logout')

    const { status, user, idToken, refreshToken } = store.state.auth

    expect( status ).toBe( 'not-authenticated' )
    expect( user ).toBeNull()
    expect( idToken ).toBeNull()
    expect( refreshToken ).toBeNull()

    expect( localStorage.getItem( 'idToken' ) ).toBeNull()
    expect( localStorage.getItem( 'refreshToken' ) ).toBeNull()

  })

  // Getters
  test('Getter: username currentState', () => {
        
    const store = createVuexStore({
        status: 'authenticated', // 'authenticated','not-authenticated', 'authenticating'
        user: { username: 'testUser', email: 'test@gmail.com' },
        idToken: 'ABC-123',
        refreshToken: 'XYZ-456'
    })

    expect( store.getters['auth/currentStatus'] ).toBe('authenticated')
    expect( store.getters['auth/username'] ).toBe('testUser')

  })

  // Actions
  test('Actions: createUser - User already exists error', () => {
    
    const store = createVuexStore({
      status: 'not-authenticated', // 'authenticated','not-authenticated', 'authenticating'
      user: null,
      idToken: null,
      refreshToken: null
    })

    const newUser = { username: 'Test User', email: 'test@test.com', password: '123456' }

    const { status, user, idToken, refreshToken } = store.state.auth

    expect( status ).toBe( 'not-authenticated' )
    expect( user ).toBeNull()
    expect( idToken ).toBeNull()
    expect( refreshToken ).toBeNull()

  })

  test('Actions: createUser signInUser - Create user', async() => {

    const store = createVuexStore({
        status: 'not-authenticated', // 'authenticated','not-authenticated', 'authenticating'
        user: null,
        idToken: null,
        refreshToken: null
    })

    const newUser = { username: 'TestingUser', email: 'testing@test.com', password: '123456' }
    // SignIn
    const a = await store.dispatch('auth/signInUser', { ...newUser } )
    const { idToken } = store.state.auth


    // Remove user
    const deleteResp = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyBZn-GbY2C1JH1CR2l0nYT9ntJETetaeG4`, {
        idToken
    })

    // Create user
    const resp = await store.dispatch('auth/createUser', newUser )

    expect(resp).toEqual({ ok: true })

    const { status, user, idToken:token, refreshToken } = store.state.auth
    
    expect( status ).toBe( 'authenticated' )
    expect( user ).toMatchObject({ username: 'TestingUser', email: 'testing@test.com' })
    expect( typeof token ).toBe('string')
    expect( typeof refreshToken ).toBe('string')
  })

  test('Actions: checkAuthentication - POSITIVA', async() => {
        
    const store = createVuexStore({
        status: 'not-authenticated', // 'authenticated','not-authenticated', 'authenticating'
        user: null,
        idToken: null,
        refreshToken: null
    })

    // SignIn
    const signInResp = await store.dispatch('auth/signInUser', { email: 'test@test.com', password:'123456' })
    const { idToken } = store.state.auth 
    store.commit('auth/logout')

    localStorage.setItem('idToken', idToken)

    const checkResp = await store.dispatch('auth/checkAuthStatus')
    const { status, user, idToken:token, refreshToken } = store.state.auth

    expect(checkResp).toEqual({ ok: true })
    
    expect( status ).toBe( 'authenticated' )

    expect( user ).toMatchObject({ username: 'User test', email: 'test@test.com' })
    expect( typeof token ).toBe('string')

  })

  test('Actions:checkAuthentication - NEGATIVA', async() => {
        
    const store = createVuexStore({
        status: 'authenticating', // 'authenticated','not-authenticated', 'authenticating'
        user: null,
        idToken: null,
        refreshToken: null
    })

    localStorage.removeItem('idToken')
    const checkResp1 = await store.dispatch('auth/checkAuthStatus')
    expect(checkResp1).toEqual({ ok: false, message: 'No token provided' })
    expect( store.state.auth.status ).toBe('not-authenticated')

    localStorage.setItem('idToken','ABC-123')
    const checkResp2 = await store.dispatch('auth/checkAuthStatus')
    expect(checkResp2).toEqual({ ok: false, message: 'INVALID_ID_TOKEN' })
    expect( store.state.auth.status ).toBe('not-authenticated')

  })

})