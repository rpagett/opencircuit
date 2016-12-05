import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Icon from '../Icon';
import LoadingCube from '../LoadingCube';
import { LaunchModalButton } from '../../modals/SpawnableModal';

import * as FlexTableActions from './FlexTableActions';

class _FlexTable extends React.Component {
  static propTypes = {
    columns: React.PropTypes.object.isRequired,
    emptyMessage: React.PropTypes.string.isRequired,
    endpoint: React.PropTypes.string,
    isLoading: React.PropTypes.bool,
    title: React.PropTypes.string,

    canEdit: React.PropTypes.func,
    canDelete: React.PropTypes.func,
    deriveName: React.PropTypes.func
  }

  static defaultProps = {
    isLoading: true
  }

  componentWillMount() {
    this.props.dumpContents();
  }

  componentDidMount() {
    if (this.props.fedContents) {
      this.props.preloadContents();
    }
    else if (this.props.endpoint) {
      this.props.fetchContents();
    }
  }

  editButton(route) {
    return (
      <Link to={ route } key={ route + '-edit'}>
        <Icon shape="pencil" />
      </Link>
    )
  }

  deleteButton(route, name) {
    return (
      <LaunchModalButton
        className="btn-link"
        buttonText={ <Icon shape="trash" /> }
        key={ route + '-delete' }

        title="Confirm Deletion"
        componentName="FLEXTABLE_CONFIRM_DELETION"
        modalProps={{
          name,
          endpoint: route,
          refreshTable: this.props.name,
          refreshEndpoint: this.props.endpoint
        }}
      />
    )
  }

  render() {
    console.log('Rendering');
    let showOptionsColumn = false;
    let tryEdit = false;
    let tryDelete = false;

    if (this.props.canEdit) {
      tryEdit = true;
    }
    if (this.props.canDelete) {
      tryDelete = true;
    }

    if (this.props.isLoading && !this.props.contents) {
      return (
        <LoadingCube show={ true } />
      );
    }

    if (this.props.error) {
      return (
        <strong>There was an error: { this.props.error }.</strong>
      );
    }

    if (!this.props.contents || !this.props.contents.length) {
      return (
        <strong>{ this.props.emptyMessage }</strong>
      );
    }

    const columns = this.props.columns;

    let header = [ ];
    for (let key in columns) {
      header.push(<th key={ key }>{ key }</th>);
    }

    let contents = [ ];
    this.props.contents.map(line => {
      let cells = [ ];

      let editRoute = null;
      if (tryEdit) {
        editRoute = this.props.canEdit(line, this.props.authUser);
      }

      let deleteRoute = null;
      if (tryDelete) {
        deleteRoute = this.props.canDelete(line, this.props.authUser);
      }

      for (let key in columns) {
        cells.push(
          <td key={ line._id + '-' + key } data-title={ key }>
            { columns[key](line, this.props.feedDispatch()) }
          </td>
        );
      }

      if (editRoute || deleteRoute) {
        cells.push(
          <td key={ line._id + '-opts' } data-title="Options">
            { (editRoute ? this.editButton(editRoute) : null) }
            { (deleteRoute ? this.deleteButton(deleteRoute, this.props.deriveName(line)) : null) }
          </td>
        )

        showOptionsColumn = true;
      }

      contents.push(<tr key={ line._id + Math.random() }>{ cells }</tr>);
    })

    if (showOptionsColumn) {
      header.push(<th>Options</th>)
    }

    return (
      <div>
        { (this.props.title ? <h3>{ this.props.title }</h3> : '') }
        <table className="flex-table table table-striped table-hover">
          <thead>
            <tr>{ header }</tr>
          </thead>
          <tbody>
          { contents }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    isLoading: state.flexTable.isLoading,
    error: state.flexTable.error,
    contents: state.flexTable[props.name],
    authUser: state.auth.user
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchContents: () => {
      dispatch(FlexTableActions.fetchContents(props.name, props.endpoint));
    },

    preloadContents: () => {
      dispatch(FlexTableActions.receivedContents(props.name, props.fedContents));
    },

    dumpContents: () => {
      dispatch(FlexTableActions.dumpContents(props.name));
    },

    feedDispatch: () => { return dispatch },

    setLoading: () => {
      dispatch(FlexTableActions.beginLoading(props.endpoint));
    }
  }
}

const FlexTable = connect(mapStateToProps, mapDispatchToProps)(_FlexTable);
export default FlexTable;