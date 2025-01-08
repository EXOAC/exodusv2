import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './lib/auth/AuthProvider';
import { StatusProvider } from './context/StatusContext';
import { ProductsProvider } from './context/ProductsContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoginPage from './pages/admin/LoginPage';
import SignUp from './pages/auth/SignUp';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import AdminRoute from './components/admin/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/DashboardPage';
import UsersPage from './pages/admin/UsersPage';
import ProductsPage from './pages/admin/ProductsPage';
import ProductPage from './components/products/ProductPage'
import CategoriesPage from './pages/admin/CategoriesPage';
import AdminStatusPage from './pages/admin/AdminStatusPage';
import Status from './pages/Status';

const queryClient = new QueryClient();

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <StatusProvider>
            <ProductsProvider>
              <div className="flex flex-col min-h-screen bg-black">
                <Header />
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/status" element={<Status />} />
                  <Route path="/product/:id" element={<ProductPage />} />

                  {/* Protected Dashboard Routes */}
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardPage />} />
                  </Route>

                  {/* Protected Admin Routes */}
                  <Route path="/admin" element={
                    <AdminRoute>
                      <AdminLayout />
                    </AdminRoute>
                  }>
                    <Route path="login" element={<LoginPage />} />
                    <Route index element={<AdminDashboard />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="categories" element={<CategoriesPage />} />
                    <Route path="status" element={<AdminStatusPage />} />
                  </Route>
                </Routes>
                <Footer />
              </div>
            </ProductsProvider>
          </StatusProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
