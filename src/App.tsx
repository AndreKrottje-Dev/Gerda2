import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getUserProfile } from './utils/storage';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import FoodPage from './pages/FoodPage';
import ExercisePage from './pages/ExercisePage';
import ProgressPage from './pages/ProgressPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const profile = getUserProfile();
  const hasProfile = profile !== null;

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
