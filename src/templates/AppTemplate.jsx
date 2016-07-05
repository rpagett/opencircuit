import React from 'react';
import SpawnableModal from '../modals/SpawnableModal';

export default class AppTemplate extends React.Component {
  render() {
    return (
      <div style={{ 'height': '100%' }}>
        { this.props.children }
        <SpawnableModal />
      </div>
    )
  }
};