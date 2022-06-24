import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import Swal from 'sweetalert2'

import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../mocks-data/test-journal-state'

import EntryView from '@/modules/daybook/views/EntryView'

const createVuexStore = ( initialState ) => 
  createStore({
    modules: {
      journal: {
        ...journal,
        state: structuredClone( initialState )
      }
    }
  })

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn()
}))  

describe('EntryView tests', () => {

  const store = createVuexStore( journalState )
  store.dispatch = jest.fn()

  const mockRouter = {
    push: jest.fn()
  }

  let wrapper

  beforeEach( () => {

    jest.clearAllMocks()

    wrapper = shallowMount( EntryView, {
      props: {
        id: '-N4Wv4XVronCdn1koj1B'
      },
      global: {
        mocks: {
          $router: mockRouter
        },
        plugins: [ store ]
      }
    })
  })
  
  test('should redirect the user if the id does not exist', () => {
    
    shallowMount( EntryView, {
      props: {
        id: 'This ID does not exist in the STORE'
      },
      global: {
        mocks: {
          $router: mockRouter
        },
        plugins: [ store ]
      }
    })

    expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'no-entry' })

  })

  test('should show the entry correctly', () => {
    
    expect( wrapper.html() ).toMatchSnapshot()
    expect( mockRouter.push ).not.toHaveBeenCalled()

  })

  test('should delete the entry and get out', async() => {
    
    Swal.fire.mockReturnValueOnce( Promise.resolve({ isConfirmed: true }) )

    await wrapper.find('.btn-danger').trigger('click')

    expect( Swal.fire ).toHaveBeenCalledWith({ 
      title: 'Are you sure?',
      text: "You can't undo this action",
      showDenyButton: true,
      confirmButtonText: 'Yes, I am sure'
    })

    expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'no-entry'})
    expect( store.dispatch ).toHaveBeenCalledWith('journal/deleteEntry', '-N4Wv4XVronCdn1koj1B')
    
  })

})    