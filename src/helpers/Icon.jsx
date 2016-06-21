import React from 'react';

export default class Icon extends React.Component {
  render() {
    const typeClass = 'fa-' + this.props.shape;
    const size = (this.props.size > 1 ? ' fa-' + this.props.size + 'x' : '');

    const classes = 'fa ' + typeClass + size;

    return (
      <i className={ classes } aria-hidden="true" />
    );
  }

  static propTypes = {
    shape: React.PropTypes.string.isRequired,
    size: React.PropTypes.number,
  }
};