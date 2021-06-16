import React from 'react';


const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));


const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const Widgets = React.lazy(() => import('./views/widgets/Widgets'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  
  
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/cards', name: 'Cards', component: Cards, exact: true },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/widgets', name: 'Widgets', component: Widgets }
];

export default routes;
