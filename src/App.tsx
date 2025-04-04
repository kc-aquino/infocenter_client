import './App.css';
import MainLayout from './pages/MainLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home';
import FirePage from '@/pages/FirePage';
import FirstAidPage from '@/pages/FirstAidPage';
import FloodPage from '@/pages/FloodPage';
import GarbagePage from '@/pages/GarbagePage';
import PharmacyPage from '@/pages/PharmacyPage';
import RegisterPage from '@/pages/RegisterPage';
import ShelterPage from '@/pages/ShelterPage';
import TsunamiPage from '@/pages/TsunamiPage';
import TrafficPage from '@/pages/TrafficPage';
import UtilitiesPage from '@/pages/UtilitiesPage';
import Weather from '@/pages/WeatherPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="fire" element={<FirePage />} />
          <Route path="first-aid" element={<FirstAidPage />} />
          <Route path="flood" element={<FloodPage />} />
          <Route path="garbage" element={<GarbagePage />} />
          <Route path="pharmacy" element={<PharmacyPage />} />
          <Route path="shelter" element={<ShelterPage />} />
          <Route path="traffic" element={<TrafficPage />} />
          <Route path="tsunami" element={<TsunamiPage />} />
          <Route path="utilities" element={<UtilitiesPage />} />
          <Route path="weather" element={<Weather />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
