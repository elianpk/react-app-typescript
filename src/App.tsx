import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SessionContextProvider } from './components/auth/SessionContext';
import PrivateRoute from './components/auth/PrivateRoute'


//Pages
import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/Dashboard'
import NotFoundPage from './components/shared/pages/notFound/NotFound'

function App() {
  return (
    <Router>
      <SessionContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="" element={<Dashboard />} />
          </Route>
        </Routes>
      </SessionContextProvider>
    </Router>
  );
}

export default App;
