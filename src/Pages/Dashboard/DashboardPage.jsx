import React from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Topbar from '../../Components/Topbar/Topbar';
import SubscriptionsPage from './SubscriptionsPage';
import AnalyticsPage from './AnalyticsPage';
import BillingPage from './BillingPage';
import NotificationsPage from './NotificationsPage';
import SettingsPage from './SettingsPage';
import ProfilePage from './ProfilePage';

export default function DashboardPage({ pageKey }) {
  const renderPage = () => {
    switch (pageKey) {
      case 'subscriptions':
        return <SubscriptionsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'billing':
        return <BillingPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <SubscriptionsPage />;
    }
  };

  return (
    <div className="tm-root">
      <Topbar />
      <div className="tm-body">
        <Sidebar />
        <main className="tm-main">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
