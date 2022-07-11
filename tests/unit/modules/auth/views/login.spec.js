import { shallowMount } from '@vue/test-utils'
import { RouterLinkStub } from '@vue/test-utils'

import Login from '@/modules/auth/views/Login.vue'

import createVuexStore from '../../../mocks-data/mock-store'

// import Swal from 'sweetalert2'

// jest.mock('sweetalert2', () => ({
//     fire: jest.fn(),
//     showLoading: jest.fn(),
//     close: jest.fn()
// }))

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


    test('should match the snapshot', () => {
        
        const wrapper = shallowMount( Login, {
            global: {
                plugins: [ store ]
            },
            //TODO: This line was added to use router-link as a stub, however, it gives a warning as it does not find the component
            // The error disappears if this is declared as components instead of stubs, but the stub is lost. Find more info about this
            stubs: {
              'router-link': RouterLinkStub
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })

    
    


})