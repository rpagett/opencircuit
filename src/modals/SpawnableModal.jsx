import React from 'react';
import { Modal, Transition } from 'react-overlays';
import { connect } from 'react-redux';

import Icon from '../helpers/Icon';
import LoadingCube from '../helpers/LoadingCube';
import * as ModalActions from './ModalActions';

class SpawnableModalTransition extends React.Component {
  render() {
    return (
      <Transition
        timeout={ 200 }
        backdropTransitionTimeout={ 200 }
        className="spawnable-modal-fade"
        enteringClassName="spawnable-modal-in"
        enteredClassName="spawnable-modal-in"
        { ...this.props }
      />
    )
  }
}

class _SpawnableModal extends React.Component {
  static defaultProps = {
    isOpen: false
  }

  fetchModalBody() {
    return (
      <LoadingCube show={ true } />
    )
  }

  render() {
    const modalStyle = {
      position: 'fixed',
      zIndex: 1040,
      top: 0, bottom: 0, left: 0, right: 0
    };

    const backdropStyle = {
      ...modalStyle,
      //zIndex: 'auto',
      backgroundColor: '#000',
      opacity: 0.5
    };

    return (
      <div>
        <Modal
          aria-labelledby="modal-label"
          //backdropClassName="spawnable-modal-backdrop"
          backdropStyle={ backdropStyle }
          show={ this.props.isOpen }
          onHide={ this.props.markClosed }
          transition={ SpawnableModalTransition }
        >
          <div className="container spawnable-modal">
            { (this.props.allowClose ?
              <span className="pull-right close">
                  <Icon shape="close" />
                </span> : '') }
            <div className="row">
              { (this.props.title ? <h4 id="modal-label">{ this.props.title }</h4> : '') }
            </div>

            <hr />

            <div className="row">
              { this.fetchModalBody() }
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isOpen: state.modal.isOpen,
    allowClose: state.modal.allowClose,
    title: state.modal.title,
    componentName: state.modal.component
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    markClosed: () => {
      dispatch(ModalActions.close());
    }
  }
}

const SpawnableModal = connect(mapStateToProps, mapDispatchToProps)(_SpawnableModal);
export default SpawnableModal;