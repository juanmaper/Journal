import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../mocks-data/test-journal-state'

import EntryList from '@/modules/daybook/components/EntryList'

const createVuexStore = ( initialState ) => 
    createStore({
      modules: {
        journal: {
          ...journal,
          state: structuredClone( initialState )
        }
      }
    })

describe('EntryList component tests', () => {
  
  const store = createVuexStore( journalState )
  const mockRouter = {
    push: jest.fn()
  }

  let wrapper

  beforeEach( () => {

    jest.clearAllMocks()

    wrapper = shallowMount( EntryList, {
      global: {
        mocks: {
          $router: mockRouter
        },
        plugins: [ store ]
      }
    })
  })

  test('should call getEntriesByTerm without term and show 2 entries', () => {
    
    expect( wrapper.findAll('entry-stub').length ).toBe(2)
    
  })

  test('should call getEntriesByTerm with term and filter entries', async() => {
    
    const input = wrapper.find('input')
    await input.setValue('fantasy')

    expect( wrapper.findAll('entry-stub').length ).toBe(1)
    
  })

  test('should redirect to /new when the new button is clicked', () => {
    
    wrapper.find('button').trigger('click')

    expect( mockRouter.push )
      .toHaveBeenCalledWith({ name: 'entry', params: { id: 'new' } })

  })

})

