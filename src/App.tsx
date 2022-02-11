import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { useAppSelector } from './store';
import Landing from './pages/Landing';
import News from './pages/News';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const AppRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAppSelector((store) => store.auth.token);

  useEffect(() => {
    if (token && location.pathname === '/') {
      navigate('/news');
    } else if (!token && location.pathname !== '/') {
      navigate('/');
    }
  }, [token, location, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/news" element={<News />} />
    </Routes>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;
