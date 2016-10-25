import React from 'react';
import { Modal, Transition } from 'react-overlays';
import { connect } from 'react-redux';

import Icon from '../helpers/Icon';
import LoadingCube from '../helpers/LoadingCube';
import * as ModalActions from './ModalActions';
import * as FeeModals from '../models/Fee/FeeModals';
import * as FileModals from '../models/File/FileModals';
import * as FlexTableModals from '../helpers/FlexTable/FlexTableModals';
import * as UnitModals from '../models/Unit/UnitModals';
import * as UserModals from '../models/User/UserModals';

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
    const modalProps = {
      ...this.props.modalProps,
      markClosed: this.props.markClosed
    }
    switch (this.props.componentName) {

      case 'UNIT_RECLASSIFY':
        return <UnitModals.Reclassify { ...modalProps } />;

      case 'USER_ROLES':
        return <UserModals.ManageRoles { ...modalProps } />;

      case 'FEE_APPLY_PAYMENT':
        return <FeeModals.AdminPayment { ...modalProps } />;

      case 'FEE_ASSESS_FEE':
        return <FeeModals.AssessFee { ...modalProps } />;

      case 'FEE_GENERATE_INVOICE':
        return <FeeModals.GenerateInvoice { ...modalProps } />;

      case 'FEE_USER_PAY':
        return <FeeModals.UserPayment { ...modalProps } />

      case 'FEE_PAYMENTS':
        return <FeeModals.Payments { ...modalProps } />

      case 'FLEXTABLE_CONFIRM_DELETION':
        return <FlexTableModals.ConfirmDeletion { ...modalProps } />

      case 'FILE_UPLOAD':
        return <FileModals.Upload { ...modalProps } />

      default:
        return (<LoadingCube show={ true } />)
    }
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
          <div className="container-fluid spawnable-modal">
            { (this.props.allowClose ?
              <span className="pull-xs-right close" onClick={ this.props.markClosed }>
                  <Icon shape="close" />
                </span> : '') }
            <div className="row">
              { (this.props.title ? <h4 id="modal-label">{ this.props.title }</h4> : '') }
            </div>

            <hr />

            { this.fetchModalBody() }
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allowClose: state.modal.allowClose,
    componentName: state.modal.component,
    isOpen: state.modal.isOpen,
    modalProps: state.modal.props,
    title: state.modal.title
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

class _LaunchModalButton extends React.Component {
  static propTypes = {
    buttonProps: React.PropTypes.object,

    title: React.PropTypes.string.isRequired,
    componentName: React.PropTypes.string.isRequired,
    modalProps: React.PropTypes.object
  }

  render() {
    return (
      <button className={ this.props.className } { ...this.props.buttonProps } onClick={ this.props.launch.bind(this) }>
        { this.props.buttonText }
      </button>
    )
  }
}

const mapDispatchToButtonProps = (dispatch, props) => {
  return {
    launch: () => {
      dispatch(ModalActions.launch(props.title, props.componentName, props.modalProps))
    }
  }
}

export const LaunchModalButton = connect(state => { return { } }, mapDispatchToButtonProps)(_LaunchModalButton);