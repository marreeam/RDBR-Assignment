import React from 'react';
import Header from '../components/Header/header';
import AppRoutes from '../routes/AppRoutes';

const MainLayout = () => {
  return (
    <div>
      <Header />
    <AppRoutes/>
    </div>
  );
};

export default MainLayout;



