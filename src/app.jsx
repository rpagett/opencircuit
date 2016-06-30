import React from 'react';

import SpawnableModal from 'modals/SpawnableModal';

import AppContent from './layout/AppContent';
import Header from './layout/Header';
import Footer from './layout/Footer';
import BodyContent from './layout/BodyContent';

class App extends React.Component {
  render() {
    return (
      <AppContent>
        <Header />

        <BodyContent>
          { this.props.children }
        </BodyContent>

        <Footer />
        {/*<SpawnableModal /> */}
      </AppContent>
    );
  }
}

export default App;