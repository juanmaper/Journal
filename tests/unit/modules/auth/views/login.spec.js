import { shallowMount } from '@vue/test-utils'

import Swal from 'sweetalert2'

import Login from '@/modules/auth/views/Login.vue'
import createVuexStore from '../../../mocks-data/mock-store'


jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))

const mockRouter = {
  push: jest.fn()
}

jest.mock('vue-router', () => ({
  useRouter: () => mockRouter
}))



describe('Login Component tests', () => {
    
    const store = createVuexStore({
        status: 'not-authenticated', // 'authenticated','not-authenticated', 'authenticating'
        user: null,
        idToken: null,
        refreshToken: null
    })

    store.dispatch = jest.fn()

    beforeEach(() => jest.clearAllMocks() )

    const wrapper = shallowMount( Login, {
      global: {
          plugins: [ store ],
          stubs: [ 'router-link' ]
      }
    })

    test('should match the snapshot', () => {

        expect(wrapper.html()).toMatchSnapshot()
    })

    test('credenciales incorrectas, disparar el SWAL', async() => {
        
      const errorMessage = 'Credentials error'

      store.dispatch.mockReturnValueOnce({ ok: false, message: errorMessage })

      await wrapper.find('form').trigger('submit')
      expect( store.dispatch ).toHaveBeenCalledWith('auth/signInUser', { email: '', password: ''})
      expect( Swal.fire ).toHaveBeenCalledWith('Error', errorMessage, 'error')
    })
  
    test('should redirect to no-entry route', async() => {
        
      store.dispatch.mockReturnValueOnce({ ok: true })
  
      const [ txtEmail, txtPassword ] = wrapper.findAll('input')
      await txtEmail.setValue('juanma@gmail.com')
      await txtPassword.setValue('123456')
  
      await wrapper.find('form').trigger('submit')

      expect( store.dispatch ).toHaveBeenCalledWith('auth/signInUser', { email: 'juanma@gmail.com', password: '123456' })
      expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'no-entry' })
    })


})