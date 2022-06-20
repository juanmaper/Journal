import journal from "@/modules/daybook/store/journal"
import { journalState } from '../../../../mocks-data/test-journal-state'
import { createStore } from "vuex"

const createVuexStore = ( initialState ) => 
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState }
      }
    }
  })

  describe('Vuex - Journal Module tests', () => {
    
    test('should have this initial state', () => {
      
      const store = createVuexStore( journalState )
      const { isLoading, entries } = store.state.journal

      expect( isLoading ).toBeFalsy()
      expect( entries ).toEqual( journalState.entries )
    })

  })