import React from 'react';
import Header from '../components/Header/header';
import AppRoutes from '../routes/AppRoutes';

const MainLayout = ({children}) => {
  return (
    <div>
      <Header />
      <main>{children}</main>

    </div>
  );
};

export default MainLayout;



