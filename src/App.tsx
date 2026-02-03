import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserProfile } from './utils/storage';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import FoodPage from './pages/FoodPage';
import ExercisePage from './pages/ExercisePage';
import ProgressPage from './pages/ProgressPage';
import ProfilePage from './pages/ProfilePage';

function AppRoutes() {
  const location = useLocation();
  const [profile, setProfile] = useState(getUserProfile());

  useEffect(() => {
    setProfile(getUserProfile());
  }, [location.pathname]);

  const hasProfile = profile !== null;

  return (
    <Routes>
      {!hasProfile ? (
        <>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="*" element={<Navigate to="/onboarding" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/exercise" element={<ExercisePage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
