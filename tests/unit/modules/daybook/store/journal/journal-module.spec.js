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
    
    // Basic test
    test('should have this initial state', () => {
      
      const store = createVuexStore( journalState )
      const { isLoading, entries } = store.state.journal

      expect( isLoading ).toBeFalsy()
      expect( entries ).toEqual( journalState.entries )
    })

    // Mutations
    test('mutation: setEntries', () => {
      
      const store = createVuexStore({ isLoading: true, entries: [] })

      store.commit('journal/setEntries', journalState.entries )
      expect( store.state.journal.entries.length ).toBe(2)

      store.commit('journal/setEntries', journalState.entries )
      expect( store.state.journal.entries.length ).toBe(4)

      expect( store.state.journal.isLoading ).toBeFalsy()
    })

    test('mutation: updateEntry', () => {

      const store = createVuexStore( journalState )

      const updatedEntry = {
        id: '-N4Wv4XVronCdn1koj1B',
        date: 1655205284034,
        picture: "https://res.cloudinary.com/ds3yf4btu/image/upload/v1655216917/iczhdkowquouhqjer3zp.png",
        text: "Hello world from tests"
      }

      store.commit('journal/updateEntry', updatedEntry)

      const storeEntries = store.state.journal.entries

      expect( storeEntries.length ).toBe(2)

      expect( storeEntries.find( e => e.id === updatedEntry.id ))
        .toEqual( updatedEntry )
    })

  })