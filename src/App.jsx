import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import DashboardLayout from './components/Layout/DashboardLayout';
import Home from './pages/Home';
import JobSearch from './pages/JobSearch';
import Login from './pages/Auth/Login';
import EmployerDashboard from './pages/Employer/EmployerDashboard';
import CandidateDashboard from './pages/Candidate/CandidateDashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Main Navbar and Footer */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="jobs" element={<JobSearch />} />
          <Route path="login" element={<Login />} />
        </Route>
        
        {/* Employer Dashboard Routes */}
        <Route path="/employer" element={<DashboardLayout role="employer" />}>
          <Route path="dashboard" element={<EmployerDashboard />} />
        </Route>

        {/* Candidate Dashboard Routes */}
        <Route path="/candidate" element={<DashboardLayout role="candidate" />}>
          <Route path="dashboard" element={<CandidateDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
