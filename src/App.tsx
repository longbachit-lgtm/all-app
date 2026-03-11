import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Layout from '@/components/layout/Layout';
import UserLayout from '@/components/layout/UserLayout';
import Dashboard from '@/pages/Dashboard';
import AppForm from '@/pages/AppForm';
import AppDetail from '@/pages/AppDetail';
import UserStore from '@/pages/UserStore';
import Login from '@/pages/Login';

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-slate-500">
      <span className="material-icons text-4xl mb-2">construction</span>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p>Coming soon...</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            {/* Login Route */}
            <Route path="/login" element={<Login />} />

            {/* User Front-end Store */}
            <Route path="/" element={<UserLayout />}>
              <Route index element={<UserStore />} />
              <Route path="app/:id" element={<AppDetail />} />
            </Route>

            {/* Admin Management Dashboard */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard isAdmin={true} />} />
              <Route path="add" element={<AppForm />} />
              <Route path="edit/:id" element={<AppForm />} />
              <Route path="history" element={<PlaceholderPage title="Lịch sử giao dịch" />} />
              <Route path="account" element={<PlaceholderPage title="Thông tin tài khoản" />} />
            </Route>
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}
