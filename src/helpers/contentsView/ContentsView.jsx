import React from 'react';
import { connect } from 'react-redux';

import LoadingCube from '../LoadingCube';
import * as actions from './ContentsViewActions';

class _ContentsView extends React.Component {
  static propTypes = {
    endpoint: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    isLoading: React.PropTypes.bool
  }

  static defaultProps = {
    isLoading: true
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

    return (<this.props.component contents={ this.props.contents } />)
  }
}

const mapStateToProps = state => {
  return {
    contents: state.contentsView.contents,
    error: state.contentsView.error,
    isLoading: state.contentsView.isLoading
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchContents: () => dispatch(actions.fetchContents(props.endpoint))
  }
}

const ContentsView = connect(mapStateToProps, mapDispatchToProps)(_ContentsView);
export default ContentsView;