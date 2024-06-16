import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from './welcome/WelcomePage';
import CreateAccount from './CreateAccount/CreateAccount';
import ImportAccount from './ImportAccount/ImportAccount';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/import-account" element={<ImportAccount />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;