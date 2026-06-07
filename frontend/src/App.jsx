import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorApplication from './pages/DoctorApplication';
import SearchDashboard from './pages/SearchDashboard';
import DoctorProfileDetails from './pages/DoctorProfileDetails';
import MedicalBackground from './components/MedicalBackground';

function App() {
  return (
    <Router>
      {/*
        MedicalBackground is fixed-position and sits at z-index:0.
        All page content uses z-10+ so it always floats above the icons.
        Being outside <Routes> means it persists across all route changes
        without unmounting/remounting — smooth continuous animation.
      */}
      <MedicalBackground />

      {/* All page content sits above the background (relative + z-10) */}
      <div className="relative z-10">
        <Routes>
          {/* Public pages */}
          <Route path="/"              element={<LandingPage />}          />
          <Route path="/login"         element={<Login />}                />
          <Route path="/register"      element={<Register />}             />
          <Route path="/apply-doctor"  element={<DoctorApplication />}    />

          {/* Search & discovery */}
          <Route path="/search"        element={<SearchDashboard />}      />
          <Route path="/doctors/:id"   element={<DoctorProfileDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;