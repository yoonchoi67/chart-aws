import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Help = React.lazy(() => import('./views/help/Help'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/help', name: 'Help', component: Help },
];

export default routes;
