import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Placeholder from './pages/Placeholder';
import Escalafon from './pages/Escalafon';
import Constitucion from './pages/Constitucion';
import Contacto from './pages/Contacto';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/mandos" element={<Placeholder title="Mandos" />} />
        <Route path="/jud-marchas" element={<Placeholder title="JUD Marchas" />} />
        <Route path="/jud-ataque" element={<Placeholder title="JUD Ataque" />} />
        <Route path="/escalafon" element={<Escalafon title="Escalafón" />} />
        <Route path="/constitucion" element={<Constitucion title="Constitución" />} />
        <Route path="/contacto" element={<Placeholder title="Contacto" />} />
      </Routes>
    </Router>
  );
}

export default App;
