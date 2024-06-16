import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from './welcome/WelcomePage';
import CreateAccount from './CreateAccount/CreateAccount'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;