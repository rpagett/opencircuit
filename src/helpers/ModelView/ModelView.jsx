import React from 'react';
import { connect } from 'react-redux';

import LoadingCube from '../LoadingCube';
import * as actions from './ModelViewActions';

class _ModelView extends React.Component {
  static propTypes = {
    endpoint: React.PropTypes.string.isRequired,
    subStore: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    isLoading: React.PropTypes.bool,
  }

  static defaultProps = {
    isLoading: true
  }

  componentWillMount() {
    this.props.dumpContents();
  }

  componentDidMount() {
    this.props.fetchModel();
  }

  render() {
    if (this.props.isLoading) {
      return <LoadingCube show={ true } />
    }

    if (!this.props.model) {
      if (this.props.returnEmpty) {
        return <div></div>
      }

      return (<strong>Nothing to display.</strong>)
    }

    if (this.props.error) {
      return (<strong>{ this.props.error.message + " - " + this.props.error.filename }</strong>);
    }
    
    return (<this.props.component model={ this.props.model } />)
  }
}

const mapStateToProps = (state, props) => {
  return {
    model: state.modelView[props.subStore],
    error: state.modelView.error,
    isLoading: state.modelView.isLoading
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchModel: () => dispatch(actions.fetchModel(props.endpoint, props.subStore)),
    dumpContents: () => {
      dispatch(actions.dumpContents(props.subStore));
    },
  }
}

const ModelView = connect(mapStateToProps, mapDispatchToProps)(_ModelView);
export default ModelView;