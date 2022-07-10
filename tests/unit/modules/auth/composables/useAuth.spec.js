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
        const loginForm = { email: 'test@test.com', password: '123456' }
        mockStore.dispatch.mockReturnValue({ ok: true })

        const resp = await loginUser( loginForm )

        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/signInUser', loginForm)
        expect( resp ).toEqual({ ok: true })

    })

    test('failed login', async() => {
        
        const { loginUser } = useAuth()
        const loginForm = { email: 'test@test.com', password: '123456' }
        mockStore.dispatch.mockReturnValue({ ok: false, message: 'EMAIL/PASSWORD do not exist' })

        const resp = await loginUser( loginForm )

        expect(mockStore.dispatch).toHaveBeenCalledWith('auth/signInUser', loginForm)
        expect( resp ).toEqual({ ok: false, message: 'EMAIL/PASSWORD do not exist' })

    })

    
    
    

})