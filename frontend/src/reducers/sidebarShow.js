
const initialState = {
  sidebarShow: true
}
const sidebarShow = (state = true, action) => {
  switch (action.type) {
    case 'set':
      return action.payload
    default:
      return state
  }
}

export default sidebarShow;