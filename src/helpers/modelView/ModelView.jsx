import React from 'react';
import { connect } from 'react-redux';

import LoadingCube from '../LoadingCube';
import * as actions from './ModelViewActions';

class _ModelView extends React.Component {
  static propTypes = {
    endpoint: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    isLoading: React.PropTypes.bool
  }

  static defaultProps = {
    isLoading: true
  }

  componentDidMount() {
    this.props.fetchModel();
  }

  render() {
    if (this.props.error) {
      return (<strong>{ this.props.error }</strong>);
    }

    if (this.props.isLoading) {
      return <LoadingCube show={ true } />
    }

    return (<this.props.component model={ this.props.model } />)
  }
}

const mapStateToProps = state => {
  return {
    model: state.modelView.model,
    error: state.modelView.error,
    isLoading: state.modelView.isLoading
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchModel: () => dispatch(actions.fetchModel(props.endpoint))
  }
}

const ModelView = connect(mapStateToProps, mapDispatchToProps)(_ModelView);
export default ModelView;