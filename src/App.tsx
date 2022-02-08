import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './pages/Landing';
import News from './pages/News';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
