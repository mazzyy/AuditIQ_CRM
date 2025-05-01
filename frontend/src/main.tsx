import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Layout from './layouts/Dashboard';
import ProductsView from './pages/ProductsView';
import OrdersView from './pages/OrdersView';
import ManageReports from "./pages/ManageReports";
import { OverviewAnalyticsView } from './pages/OverviewAnalyticsView';
import { BlogView } from './pages/BlogView';
import { NotFoundView } from './pages/NotFoundView';
import { HelmetProvider } from 'react-helmet-async';

import { CustomerView } from './pages/CustomerView';
import AgentForm , { agentLoader  }from './pages/AgentForm';
import SignInView from './pages/SignInView';
import CustomerForm , { customerLoader  } from './pages/CustomerForm';
import OrderForm , {orderLoader} from './pages/OrderForm';
import { CompanyDepts } from './pages/CompanyDepts';
import Locations from './pages/Locations';
import {FormsChecklist}   from './pages/FormsChecklist';
import { AuditReports } from './pages/AuditReports';
import { UsersList } from './pages/UsersList';
import { Schedule } from './pages/Schedule';
import ScheduleForm from './pages/ScheduleForm';
import { Broatcast } from './pages/Broatcast';
import broatcastForm from './pages/BroatcastForm';
import { Gallary } from './pages/Gallary';
import { HelpCenter } from './pages/HelpCenter';
import {Faq} from './pages/Faq';
import { ContactUs } from './pages/ContactUs';
import { ContactTeam } from './pages/ContactTeam';
import PaymentPage from './pages/PaymentPage';
import { ComingSoon } from './pages/ComingSoon';
import Kpi from './pages/Kpi';
const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '',
        Component: Layout,
        children: [
          {
            path: '',
            Component: OverviewAnalyticsView,
          },
        
          {
            path: 'manage-reports',
            Component: ManageReports,
         
          },
          {
            path: 'company-depts',
            Component: CompanyDepts,
          },
          {
            path: 'Forms-Checklist',
            Component: FormsChecklist,
          },
          {
            path: 'locations',
            Component: Locations,
          },
          {
            path: 'audit-reports',
            Component: AuditReports,
        
          },
          {
            path: 'UsersList',
            Component: UsersList,
          },
         
          {
            path: 'Schedule',
            Component: Schedule,
          },
          {
            path: 'ScheduleForm',
            Component: ScheduleForm,
          },
          {
            path: 'Broatcast',
            Component: Broatcast,
          },
          {
            path: 'broatcastForm',
            Component: broatcastForm,
          },
          {
            path: 'broatcastForm',
            Component: broatcastForm,
          },
          {
            path: 'Gallary',
            Component: Gallary,
          },
          {
            path: 'HelpCenter',
            Component: HelpCenter,
          },
          {
            path: 'Faq',
            Component: Faq,
          },
          {
            path: 'ContactUs',
            Component: ContactUs,
          },
          {
            path: 'ContactTeam',
            Component: ContactTeam,
          },
          {
            path: 'PaymentPage',
            Component: PaymentPage,
          },
          {
            path: 'ComingSoon',
            Component: ComingSoon,
          },
          {
            path: 'Kpi',
            Component: Kpi,
          },
        
          {
            path: 'edit-agent/:id',
            Component: AgentForm,
            loader: agentLoader

          },
          {
            path: 'customer-form',
            Component: CustomerForm,
          },
          {
            path: 'edit-customer/:id',
            Component: CustomerForm,
            loader: customerLoader

          },
          {
            path: 'order-form',
            Component: OrderForm,
          },
          {
            path: 'edit-order/:id',
            Component: OrderForm,
            loader: orderLoader

          },         
          {
            path: '*',
            Component: NotFoundView
          }
        ]
      },
      {
        path: '/sign-in',
        Component: SignInView
      },
      {
        path: '*',
        Component: NotFoundView
      }
    ],
  },
]);




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider >
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
