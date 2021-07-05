
const initialState = {
  sidebarShow: true
}
const sidebarShow = (state = false, action) => {
  switch (action.type) {
    case 'set':
      return action.payload
    default:
      return state
  }
}

export default sidebarShow;