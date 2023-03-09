import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Login from './Components/Login/Login';
import { UserStorage } from './UserContext';
import Header from './Components/Header';
import User from './Components/User/User';
import ProtectedRoute from './Components/Helper/ProtectedRoute';

function App() {
  return (
    <>
      {/* [BrowserRouter, Routes e Route]
            O [BrowserRouter] deve ser o componente pai que envolve tudo que depender do react-router. 
            O [Routes] define a área em que vamos colocar os nossos Route. 
            O [Route] recebe um caminho em path, se esse caminho for o mesmo do URL ele irá renderizar o component que estiver dentro de element={}. 
      */}
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<Login />} />
            <Route
              path="conta/*"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </>
  );
}

export default App;
