import React from 'react';
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
      </AppContent>
    );
  }
}

export default App;