import journal from "@/modules/daybook/store/journal"
import { journalState } from '../../../../mocks-data/test-journal-state'
import { createStore } from "vuex"

import authApi from "@/api/authApi"

const createVuexStore = ( initialState ) => 
  createStore({
    modules: {
      journal: {
        ...journal,
        state: structuredClone( initialState )
      }
    }
  })

  describe('Vuex - Journal Module tests', () => {

    beforeAll( async() => {

      const { data } = await authApi.post(':signInWithPassword', { 
        email: 'test@test.com',
        password: '123456',
        returnSecureToken: true
      })

      localStorage.setItem('idToken', data.idToken )

    })
    
    // Basic test ====================
    test('should have this initial state', () => {
      
      const store = createVuexStore( journalState )
      const { isLoading, entries } = store.state.journal

      expect( isLoading ).toBeFalsy()
      expect( entries ).toEqual( journalState.entries )
    })

    // Mutations ====================
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

    test('mutation: addEntry deleteEntry', () => {
      const store = createVuexStore( journalState )

      const newEntry = {
        id: 'ABC-123',
        text: 'Hello World'
      }

      store.commit('journal/addEntry', newEntry)
      expect( store.state.journal.entries.length ).toBe(3)
      expect( store.state.journal.entries.includes( newEntry ) ).toBeTruthy()

      store.commit('journal/deleteEntry', newEntry.id)
      expect( store.state.journal.entries.length ).toBe(2)
      expect( store.state.journal.entries.includes( newEntry ) ).toBeFalsy()

    })

    // Getters ====================
    test('getters: getEntriesByTerm getEntryById', () => {

      const store = createVuexStore( journalState )

      expect( store.getters['journal/getEntriesByTerm']('').length).toBe(2)
      expect( store.getters['journal/getEntriesByTerm']('fantasy').length).toBe(1)

      const [ entry1, entry2 ] = journalState.entries

      expect( store.getters['journal/getEntriesByTerm']('fantasy')).toEqual([ entry2 ])


      expect( store.getters['journal/getEntryById']( entry1.id ) ).toEqual( entry1 )

    })

    //Actions ====================
    /*
    Note: A new instance of Firebase should be set up in order to use other data in the tests, 
      setting a different URL in the journalApi file depending on the environment node var.
      Another option is to mock the API calls
    */
    test('actions: loadEntries', async() => {
      
      const store = createVuexStore({ isLoading: true, entries: [] })

      await store.dispatch('journal/loadEntries')

      expect ( store.state.journal.entries.length ).toBe(5)
    })

    test('actions: updateEntry', async() => {
      
      const store = createVuexStore( journalState )

      const updatedEntry = {
        id: '-N4XaZjH6XW5fyXHwYy5',
        date: 1655216679166,
        text: "This is a fantasy dwarf!!",
        anotherField: true
      }

      await store.dispatch('journal/updateEntry', updatedEntry)

      expect ( store.state.journal.entries.length ).toBe(2)
      expect( 
        store.state.journal.entries.find( e => e.id === updatedEntry.id )
      ).toEqual({
          id: '-N4XaZjH6XW5fyXHwYy5',
          date: 1655216679166,
          text: "This is a fantasy dwarf!!",
        })
    })

    test('actions: createEntry deleteEntry', async() => {
      
      const store = createVuexStore( journalState )

      const newEntry = {
        date: 1655205284034,
        text: 'New entry'
      }

      const newId = await store.dispatch('journal/createEntry', newEntry)

      expect( typeof newId ).toBe('string')
      expect(
        store.state.journal.entries.some( e => e.id === newId )
      ).toBeTruthy()

      await store.dispatch('journal/deleteEntry', newId)

      expect(
        store.state.journal.entries.some( e => e.id === newId )
      ).toBeFalsy()

    })

  })