import { shallowMount } from '@vue/test-utils'

import NavBar from '@/modules/daybook/components/NavBar.vue'
import createVuexStore from '../../../mocks-data/mock-store'

const mockRouter = {
  push: jest.fn()
}

jest.mock('vue-router', () => ({
  useRouter: () => mockRouter
}))

describe('Navbar component tests', () => {

    const store = createVuexStore({
        user: {
            name: 'Juanma',
            email: 'juanma@gmail.com'
        },
        status: 'authenticated',
        idToken: 'ABC',
        refreshToken: 'XYZ'
    })

    beforeEach(() =>  jest.clearAllMocks() )


    test('should properly show the component', () => {
        
        const wrapper = shallowMount( NavBar, {
            global: {
                plugins: [ store ]
            }
        })

        expect(wrapper.html()).toMatchSnapshot()

    })

    test('should close session and redirect when the logout is clicked', async() => {
        
      const wrapper = shallowMount( NavBar, {
          global: {
              plugins: [ store ]
          }
      })

      await wrapper.find('button').trigger('click')

      expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'login' })

      expect( store.state.auth ).toEqual({
          user: null,
          status: 'not-authenticated',
          idToken: null,
          refreshToken: null
      })

  })
    
    
    
})