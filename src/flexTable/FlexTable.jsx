import React from 'react';
import { connect } from 'react-redux';

import LoadingCube from '../helpers/LoadingCube';
import * as FlexTableActions from './FlexTableActions';

class _FlexTable extends React.Component {
  static propTypes = {
    columns: React.PropTypes.object.isRequired,
    emptyMessage: React.PropTypes.string.isRequired,
    endpoint: React.PropTypes.string.isRequired,
    isLoading: React.PropTypes.bool,
    title: React.PropTypes.string
  }

  static defaultProps = {
    isLoading: true
  }

  componentDidMount() {
    this.props.fetchContents();
  }

  render() {
    if (this.props.isLoading) {
      return (
        <LoadingCube show={ true } />
      );
    }

    if (this.props.error) {
      return (
        <strong>There was an error: { this.props.error }.</strong>
      );
    }

    if (!this.props.contents) {
      return (
        <strong>{ this.props.emptyMessage }</strong>
      );
    }

    const columns = this.props.columns;

    let header = [ ];
    for (let key in columns) {
      header.push(<th key={ key }>{ key }</th>);
    }

    return (
      <div>
        { (this.props.title ? <h3>{ this.props.title }</h3> : '') }
        <table className="flex-table table table-striped table-hover">
          <thead>
            <tr>{ header }</tr>
          </thead>
          <tbody>
            { this.props.contents.map(line => {
              let cells = [ ];

              for (let key in columns) {
                cells.push(
                  <td key={ line._id + '-' + key } data-title={ key }>
                    { columns[key](line, this.props.feedDispatch) }
                  </td>
                );
              }

              return (<tr key={ line._id }>{ cells }</tr>);
            }) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.flexTable.isLoading,
    error: state.flexTable.error,
    contents: state.flexTable.contents
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchContents: () => {
      dispatch(FlexTableActions.fetchContents(props.endpoint));
    },

    feedDispatch: () => { return dispatch }
  }
}

const FlexTable = connect(mapStateToProps, mapDispatchToProps)(_FlexTable);
export default FlexTable;