import { shallowMount } from '@vue/test-utils'
import Fab from '@/modules/daybook/components/Fab'

describe('Fab component tests', () => {
  
  test('should show the default icon', () => {

    const wrapper = shallowMount( Fab )

    const icon = wrapper.find('i')

    expect( icon.classes('fa-plus') ).toBeTruthy()

  })
  
  test('should show the argument icon: fa-circle', () => {

    const wrapper = shallowMount( Fab, {
      props: {
        icon: 'fa-circle'
      }
    } )

    const icon = wrapper.find('i')

    expect( icon.classes('fa-circle') ).toBeTruthy()

  })
  
  test('should emit the event on:click when clicked', () => {
    const wrapper = shallowMount( Fab )

    wrapper.find('button').trigger('click')

    expect( wrapper.emitted('on:click') ).toHaveLength(1)
  })

})


