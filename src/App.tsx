import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import db from '../db.json';
import Header from './components/Header/Header';
import RoutesConfig from './RoutesConfig';
import Footer from './components/Footer/Footer';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  const { user } = useUser();
  const [isUserValid, setIsUserValid] = useState(false);

  useEffect(() => {
    if (user) {
      const foundUser = db.users.find((u) => u.email === user.email);
      setIsUserValid(!!foundUser);
    }
  }, [user]);

  return (
    <>
      <Header />
      <RoutesConfig />
      <Footer />
    </>
  );
};

export default App;
