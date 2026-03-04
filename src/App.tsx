import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/pages/Dashboard';
import AppForm from '@/pages/AppForm';
import AppDetail from '@/pages/AppDetail';

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
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add" element={<AppForm />} />
            <Route path="edit/:id" element={<AppForm />} />
            <Route path="app/:id" element={<AppDetail />} />
            <Route path="history" element={<PlaceholderPage title="Transaction History" />} />
            <Route path="account" element={<PlaceholderPage title="Account Info" />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}
