const sidebarShow = (state = true, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return !state
    default:
      return state
  }
}

export default sidebarShow;