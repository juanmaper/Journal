import useAuth from '@/modules/auth/composables/useAuth'

const mockStore = {
    dispatch: jest.fn(),
    commit: jest.fn(),
    getters: {
        'auth/currentStatus': 'authenticated',
        'auth/username': 'Juanma'
    }
}

jest.mock('vuex', () => ({
    useStore: () => mockStore
}))


describe('useAuth tests', () => {
    

    beforeEach( ()=> jest.clearAllMocks() )


    test('successful createUser', async() => {
        
        const { createUser } = useAuth()

        const newUser = { name: 'juanma', email: 'juanma@gmail.com' }
        mockStore.dispatch.mockReturnValue({ ok: true })

        const resp = await createUser( newUser )

        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/createUser', newUser)
        expect(resp).toEqual({ ok: true })

    })


    test('failed createUser, user already exists ', async() => {
        
        const { createUser } = useAuth()

        const newUser = { name: 'juanma', email: 'juanma@gmail.com' }
        mockStore.dispatch.mockReturnValue({ ok: false, message: 'EMAIL_EXISTS' })

        const resp = await createUser( newUser )

        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/createUser', newUser)

        expect( resp ).toEqual({ ok: false, message: 'EMAIL_EXISTS' })
    })


    test('successful login', async() => {
        
        const { loginUser } = useAuth()
        const newUser = { email: 'test@test.com', password: '123456' }
        mockStore.dispatch.mockReturnValue({ ok: true })

        const resp = await loginUser( newUser )

        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/signInUser', newUser)
        expect( resp ).toEqual({ ok: true })

    })

    test('failed login', async() => {
        
        const { loginUser } = useAuth()
        const newUser = { email: 'test@test.com', password: '123456' }
        mockStore.dispatch.mockReturnValue({ ok: false, message: 'EMAIL/PASSWORD does not exist' })

        const resp = await loginUser( newUser )

        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/signInUser', newUser)
        expect( resp ).toEqual({ ok: false, message: 'EMAIL/PASSWORD does not exist' })

    })

    test('checkAuthStatus', async() => {
        
        const { checkAuthStatus } = useAuth()

        mockStore.dispatch.mockReturnValue({ ok: true })

        const resp = await checkAuthStatus()
        
        expect( mockStore.dispatch ).toHaveBeenCalledWith('auth/checkAuthStatus')
        expect( resp ).toEqual({ ok: true })

    })


    test('logout ', () => {
        
        const { logout } = useAuth()

        logout()

        expect( mockStore.commit ).toHaveBeenCalledWith('auth/logout')
        expect( mockStore.commit ).toHaveBeenCalledWith('journal/clearEntries')

    })
    
    test('Computed: authState, username', () => {
        
        const { authStatus, username } = useAuth()

        expect(authStatus.value).toBe('authenticated')
        expect(username.value ).toBe('Juanma')

    })
    
    

})