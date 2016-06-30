export function define(title, component) {
  return {
    type: 'MODAL_DEFINE',
    title,
    component
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