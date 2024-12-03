import React from 'react';
import RoutesConfig from './RoutesConfig';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <RoutesConfig />
      <Footer />
    </>
  );
};

export default App;
