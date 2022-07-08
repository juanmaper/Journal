
// export const myGetter = ( state ) => {
//  return state.something
// }

export const currentStatus = ( state ) => {
 return state.status
}

export const username = ( state ) => {
 return state.user?.username || ''
}