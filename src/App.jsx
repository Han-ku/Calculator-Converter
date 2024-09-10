import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Calculator from './pages/Calculator.js'
import Converter from './pages/Converter.js'
import NavOptions from './components/NavOptions.js';

function App() {
  return (
    <>
      <div className='context'>    
        <BrowserRouter>
          <nav className="flex">
            <div id="nav-brand"></div>
            <NavOptions/>
          </nav>

          <Routes>
            <Route path='/' element={<Calculator />}></Route>
            <Route path='/converter' element={<Converter />}></Route>
            <Route path='*' element={<h1>404 - Page Not Found</h1>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
  </>
  )
}

export default App;
