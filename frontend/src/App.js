import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navigation from '../components/Navigation/Navigation';

const ROLES = {
    User: "user",
    Editor: "mod",
    Admin: "admin",
  };

function App() {
    console.log('App.js is loaded');
    return (
        <>
        <Navigation />
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='home' element={<Home/>} />
                    <Route path='login' element={<Login/>}/>
                    <Route path='register' element={<Register/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;