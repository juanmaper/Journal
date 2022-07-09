
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
        user: { name: 'User', email: 'user@gmail.com' },
        idToken: 'ABC-123',
        refreshToken: 'XYZ-123'
    }

    store.commit('auth/loginUser', payload )

    const { status, user, idToken, refreshToken } = store.state.auth
    
    expect( status ).toBe( 'authenticated' )
    expect( user ).toEqual( { name: 'User', email: 'user@gmail.com' } )
    expect( idToken ).toBe( 'ABC-123' )
    expect( refreshToken ).toBe( 'XYZ-123' )

  })

  test('Mutation: logout ', () => {
    
    const store = createVuexStore({
      status: 'authenticated', // 'authenticated','not-authenticated', 'authenticating'
      user: { name: 'user1', email: 'example@example.com' },
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

})