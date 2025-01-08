import { useAuth } from '../../lib/auth/AuthProvider';
import { Outlet, Navigate } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';

import Loader from '../Loader';

export default function DashboardLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-black">
      
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}