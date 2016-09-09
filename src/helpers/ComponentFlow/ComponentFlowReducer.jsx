const componentFlow = (state = { currentSlug: 'root' }, action) => {
  switch (action.type) {
    case 'COMPONENTFLOW_SET_VIEW':
      return {
        ...state,
        currentSlug: action.slug
      }

    default:
      return state;
  }
}

export default componentFlow;