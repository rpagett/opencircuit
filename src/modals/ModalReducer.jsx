const initialState = {
  isOpen: false,
  allowClose: true
}

const modal = (state = initialState, action) => {
  switch (action.type) {

    case 'MODAL_OPEN':
      return {
        ...state,
        isOpen: true
      }

    case 'MODAL_CLOSE':
      return {
        ...state,
        isOpen: false
      }

    case 'MODAL_DEFINE':
      return {
        ...state,
        title: action.title,
        component: action.component
      }

    default:
      return state;
  }
}

export default modal;