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
  return {
    type: 'MODAL_CLOSE'
  }
}

export function open() {
  return {
    type: 'MODAL_OPEN'
  }
}