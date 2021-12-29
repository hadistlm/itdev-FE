import React from 'react';

const routes = {
  DASHBOARD: {
    path: '/itdev-FE',
    component: React.lazy(() => import('../../Pages/Dashboard/Dashboard'))
  },
  FORM:{
    path: '/itdev-FE/formulir',
    component: React.lazy(() => import('../../Pages/Formulir/FormView'))
  },
  TESTINGMUI: {
    path: '/itdev-FE/testing/mui',
    component: React.lazy(() => import('../../Pages/Testing/TestingMui'))
  },
  TESTINGAG: {
    path: '/itdev-FE/testing/ag',
    component: React.lazy(() => import('../../Pages/Testing/TestingAg'))
  },
  TESTINGHANDSON: {
    path: '/itdev-FE/testing/handson',
    component: React.lazy(() => import('../../Pages/Testing/TestingHandson'))
  },
};

export default routes;
