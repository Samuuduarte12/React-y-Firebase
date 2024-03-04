import React from 'react'
import Show from './components/Show';
import Edit from './components/Edit'
import Create from './components/Create'
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <div>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Show/>}/>
              <Route path='/create' element={<Create/>}/>
              <Route path='/edit/:id' element={<Edit/>}/>
            </Routes>
          </BrowserRouter>          
      </div>
    </>
  );
}

export default App;
