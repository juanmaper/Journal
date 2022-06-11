
// export const myMutation = ( state ) => {

// }

export const setEntries = ( state, entries ) => {

  state.entries = [ ...state.entries, ...entries ]
  state.isLoading = false
}

export const updateEntry = ( state, entry ) => {
  
  const index = state.entries.findIndex( element => element.id == entry.id )
  state.entries[index] = entry
}

export const addEntry = (/* state */) => {

}