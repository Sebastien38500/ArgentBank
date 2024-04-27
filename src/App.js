
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Error from './pages/Error/Error';
import LoginPage from './pages/login/login';
import UserPage from './pages/Users/User';
import EditUserNameForm from './components/form/form';
import "./components/Header/Header.scss";


function App() {
  return (
    <Router>
      
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/User" element={<UserPage />} />
              <Route path="/Edit" element={<EditUserNameForm />} />
              <Route path="/*" element={<Error />} />
            </Routes>
          </main>
          <Footer />
        </div>
     
    </Router>
  );
}

export default App;
