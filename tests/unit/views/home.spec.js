import { shallowMount } from "@vue/test-utils"
import HomeView from '@/views/HomeView'



describe('Home View tests', () => {


  test('should match the snapshot', () => {
    
    const wrapper = shallowMount( HomeView )
    expect( wrapper.html() ).toMatchSnapshot()

  })

  test('clicking a button should redirect to no-entry', () => {
    
    const mockRouter = {
      push: jest.fn()
    }

    const wrapper = shallowMount( HomeView, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })

    wrapper.find('button').trigger('click')

    expect( mockRouter.push ).toHaveBeenCalled()
    expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'no-entry' })

  })

})