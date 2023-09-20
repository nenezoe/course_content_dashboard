import React from 'react';

const Dashboard = React.lazy(() => import('./screens/Dashboard'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/upload/course', name: 'SingleUpload', element: Dashboard },
];

export default routes;
