
// export const myGetter = ( state ) => {
//  return state.something
// }

export const getEntriesByTerm = ( state ) => ( term = '' ) => {
  
  if ( term.length === 0 ) return state.entries 

  return state.entries.filter( entry => entry.text.toLowerCase().includes( term.toLocaleLowerCase() ))
}

export const getEntryById = ( state ) => ( id = '' ) => {

  /* If we return the following sentence directly, then it will be a reference to the state object
  and any modification to it will affect the state. Only mutations should be able to modify it, so 
  instead a destructured object is returned so it has its own space in memory */
  const entry = state.entries.find( entry => entry.id === id)

  if ( !entry ) return

  return { ...entry }

}