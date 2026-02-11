
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { RoleProvider, useRole } from './contexts/RoleContext';
import AdminClients from './pages/admin/AdminClients';
import AdminStores from './pages/admin/AdminStores';
import AuditVisits from './pages/auditor/AuditVisits';
import AuditForm from './pages/auditor/AuditForm';
import ClientReports from './pages/client/ClientReports';
import AdminTemplates from './pages/admin/AdminTemplates';
import AdminVisits from './pages/admin/AdminVisits';
import ClientForm from './pages/admin/ClientForm';

const Dashboard: React.FC = () => {
  const { role } = useRole();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">
          Welcome back, {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>
        <div className="text-sm text-slate-500">
          Last login: Today, 09:41 AM
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Total Visits</h3>
          <p className="text-3xl font-bold text-emerald-600">1,284</p>
          <p className="text-sm text-slate-500 mt-1">+12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Compliance Rate</h3>
          <p className="text-3xl font-bold text-blue-600">94.2%</p>
          <p className="text-sm text-slate-500 mt-1">+2.4% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Active Auditors</h3>
          <p className="text-3xl font-bold text-purple-600">42</p>
          <p className="text-sm text-slate-500 mt-1">Currently in field</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-64 flex items-center justify-center text-slate-400">
        Chart Placeholder (KPI Trends)
      </div>
    </div>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Admin Routes */}
        <Route path="/admin/clients" element={<AdminClients />} />
        <Route path="/admin/clients/new" element={<ClientForm />} />
        <Route path="/admin/stores" element={<AdminStores />} />
        <Route path="/admin/templates" element={<AdminTemplates />} />
        <Route path="/admin/visits" element={<AdminVisits />} />
        <Route path="/admin/settings" element={<div>System Settings</div>} />

        {/* Supervisor Routes */}
        <Route path="/supervisor/validate" element={<div>Validation Queue</div>} />
        <Route path="/supervisor/team" element={<div>Team Management</div>} />

        {/* Auditor Routes */}
        <Route path="/auditor/visits" element={<AuditVisits />} />
        <Route path="/auditor/form/:visitId" element={<AuditForm />} />
        <Route path="/auditor/history" element={<div>Visit History</div>} />

        {/* Client Routes */}
        <Route path="/client/reports" element={<ClientReports />} />
        <Route path="/client/preferences" element={<div>Client Preferences</div>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <RoleProvider>
      <Router>
        <AppRoutes />
      </Router>
    </RoleProvider>
  );
}

export default App;
