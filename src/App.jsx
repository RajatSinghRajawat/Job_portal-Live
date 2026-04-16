import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import DashboardLayout from './components/Layout/DashboardLayout';
import Home from './pages/Home';
import FindJobsPage from './pages/FindJobsPage';
import Login from './pages/auth/Login';
import ApplyJobPage from './pages/ApplyJobPage';
import ProfilePage from './pages/ProfilePage';
import EmployerDashboard from './pages/Employer/EmployerDashboard';
import CandidateDashboard from './pages/Candidate/CandidateDashboard';
import FeaturePage from './pages/FeaturePage';

const App = () => {
  // TODO: Add auth guards so dashboard and actions require login in production.
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Main Navbar and Footer */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="jobs" element={<FindJobsPage />} />
          <Route path="jobs/:jobId/apply" element={<ApplyJobPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route
            path="company-reviews"
            element={
              <FeaturePage
                title="Find great places to work"
                description="Explore company reviews, ratings and open roles in a simple, professional layout."
                backTo="/"
              />
            }
          />
          <Route
            path="salary-guide"
            element={
              <FeaturePage
                title="Salary Guide"
                description="Browse salary insights by role, location and experience level."
                backTo="/"
              />
            }
          />
          <Route path="login" element={<Login />} />
        </Route>
        
        {/* Employer Dashboard Routes */}
        <Route path="/employer" element={<DashboardLayout role="employer" />}>
          <Route path="dashboard" element={<EmployerDashboard />} />
          <Route
            path="jobs"
            element={
              <FeaturePage
                title="Manage Jobs"
                description="Create, update and close job listings from one place."
                backTo="/employer/dashboard"
              />
            }
          />
          <Route
            path="applicants"
            element={
              <FeaturePage
                title="Applicants"
                description="Review candidates, add notes, and move them through hiring stages."
                backTo="/employer/dashboard"
              />
            }
          />
          <Route
            path="post-job"
            element={
              <FeaturePage
                title="Post a New Job"
                description="Add new openings, mark urgent hiring, and publish quickly."
                backTo="/employer/dashboard"
              />
            }
          />
        </Route>

        {/* Candidate Dashboard Routes */}
        <Route path="/candidate" element={<DashboardLayout role="candidate" />}>
          <Route path="dashboard" element={<CandidateDashboard />} />
          <Route
            path="saved-jobs"
            element={
              <FeaturePage
                title="Saved Jobs"
                description="Track your shortlisted jobs and apply anytime."
                backTo="/candidate/dashboard"
              />
            }
          />
          <Route
            path="profile"
            element={
              <FeaturePage
                title="Candidate Profile"
                description="Update resume, skills and personal details to improve job match."
                backTo="/candidate/dashboard"
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
