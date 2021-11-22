import React from 'react';

const routes = {
  DASHBOARD: {
    path: '/',
    component: React.lazy(() => import('../../Pages/Dashboard/Dashboard'))
  },
  TESTINGMUI: {
    path: '/testing/mui',
    component: React.lazy(() => import('../../Pages/Testing/TestingMui'))
  },
  TESTINGAG: {
    path: '/testing/ag',
    component: React.lazy(() => import('../../Pages/Testing/TestingAg'))
  },
  TESTINGHANDSON: {
    path: '/testing/handson',
    component: React.lazy(() => import('../../Pages/Testing/TestingHandson'))
  },
};

export default routes;
