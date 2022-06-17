import { shallowMount } from "@vue/test-utils"
import AboutView from '@/views/AboutView'



describe('About View tests', () => {


  test('should match the snapshot', () => {

    const wrapper = shallowMount( AboutView )
    expect( wrapper.html() ).toMatchSnapshot()

  })
})