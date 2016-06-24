import React from 'react';
import { Link } from 'react-router';

export default class FlexTable extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    columns: React.PropTypes.object.isRequired,
    emptyMessage: React.PropTypes.string.isRequired,
    contents: React.PropTypes.array
  }

  headingField(columns, key) {
    if (typeof columns[key] === 'string') {
      return columns[key];
    }

    return columns[key].heading;
  }

  lineField(line, columns, key) {
    if (typeof columns[key] === 'object' && columns[key].link) {
      return <Link className="btn-link" to={ line[columns[key].link] }>{ line[key] }</Link>;
    }

    return line[key];
  }

  render() {
    const columns = this.props.columns;

    if (!this.props.contents) {
      return (
        <strong>{ this.props.emptyMessage } </strong>
      );
    }

    let header = [ ];
    for (let key in columns) {
      header.push(<th key={ key }>{ this.headingField(columns, key) }</th>);
    }

    return (
      <div>
        { (this.props.title ? <h3>{ this.props.title }</h3> : '') }
        <table className="flex-table table table-striped table-hover">
          <thead>
            <tr>{ header }</tr>
          </thead>
          <tbody>
            { this.props.contents.map((line) => {
              let cells = [ ];

              for (let key in columns) {
                cells.push(
                  <td key={ line._id + '-' + key } data-title={ this.headingField(columns, key) }>
                    { this.lineField(line, columns, key) }
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