import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Requirements from './pages/Requirements';
import LoginPage from './pages/Login';
import DashboardPage from './dash/Dashboard';
// import DashboardPage from "./dashboard/page";

// 1. This component wraps your public pages and includes the Navbar
function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This is where Home, About, Blog, etc. will render */}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* GROUP A: Pages that WILL show the Navbar */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Requirements" element={<Requirements />} />
        </Route>

        {/* GROUP B: Pages that WILL NOT show the Navbar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}