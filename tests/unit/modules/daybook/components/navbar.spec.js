import { shallowMount } from '@vue/test-utils'

import NavBar from '@/modules/daybook/components/NavBar.vue'
import createVuexStore from '../../../mocks-data/mock-store'


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

    
    
    
    
})