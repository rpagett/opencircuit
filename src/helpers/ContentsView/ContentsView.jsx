import React from 'react';
import { connect } from 'react-redux';

import LoadingCube from '../LoadingCube';
import * as actions from './ContentsViewActions';

class _ContentsView extends React.Component {
  static propTypes = {
    endpoint: React.PropTypes.string.isRequired,
    subStore: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    isLoading: React.PropTypes.bool
  }

  static defaultProps = {
    isLoading: true
  }

  componentWillMount() {
    this.props.dumpContents();
  }

  componentDidMount() {
    this.props.fetchContents();
  }

  render() {
    if (this.props.error) {
      return (<strong>{ this.props.error }</strong>);
    }

    if (this.props.isLoading) {
      return <LoadingCube show={ true } />
    }

    if (!this.props.contents) {
      if (this.props.returnEmpty) {
        return <div></div>
      }

      return (<strong>Nothing to display.</strong>)
    }

    return (<this.props.component contents={ this.props.contents } { ...this.props } />)
  }
}

const mapStateToProps = (state, props) => {
  return {
    contents: state.contentsView[props.subStore],
    error: state.contentsView.error,
    isLoading: state.contentsView.isLoading
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchContents: () => dispatch(actions.fetchContents(props.endpoint, props.subStore)),
    dumpContents: () => {
      dispatch(actions.dumpContents(props.subStore));
    },
  }
}

const ContentsView = connect(mapStateToProps, mapDispatchToProps)(_ContentsView);
export default ContentsView;