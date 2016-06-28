const form = (state = { }, action) => {
  switch (action.type) {

    case 'FORM_RECEIVED_DATA':
      console.log('In reducer.');
      const newState = {
        ...state,
        [action.formStore]: action.model,
        [action.formStore + '_errors']: { }
      }
      console.log('NEW STATE', newState);
      return newState;

    case 'FORM_UPDATE_FIELD_VALUE':
      const updatedState =  {
        ...state,
        [action.formStore]: {
          ...state[action.formStore],
          [action.field]: action.value
        }
      }
      console.log('UPDATED STATE', updatedState);
      return updatedState;

    default:
      return state
  }
}

export default form;