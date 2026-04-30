import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Location from './pages/Location';
// import SocialMedia from './pages/SocialMedia';
import SessionHistory from './pages/SessionHistory';
import Support from './pages/Support';
import Settings from './pages/Settings';

import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="upload" element={<Upload />} />
          <Route path=":sessionId" element={<Dashboard />} />
          <Route path="location" element={<Location />} />
          {/* <Route path="social" element={<SocialMedia />} /> */}
          <Route path="history" element={<SessionHistory />} />
          <Route path="support" element={<Support />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
