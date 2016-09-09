import { fetchContents as fetchFlexTable } from '../helpers/flexTable/flexTableActions';

export function launch(title, component, props = { }) {
  return dispatch => {
    dispatch(define(title, component, props));
    dispatch(open());
  }
}

function define(title, component, props = { }) {
  return {
    type: 'MODAL_DEFINE',
    title,
    component,
    props
  }
}

export function close() {
  return (dispatch, getState) => {
    dispatch({
      type: 'MODAL_CLOSE'
    });

    const { modal } = getState();
    if (modal.props.refreshTable) {
      dispatch(fetchFlexTable(modal.props.refreshTable, modal.props.refreshEndpoint))
    }
  }
}

export function open() {
  return {
    type: 'MODAL_OPEN'
  }
}