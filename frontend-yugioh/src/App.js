// src/App.js
import React from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router'
import './App.css'

function Home()    { return <h2>🏠 Home</h2> }
function About()   { return <h2>ℹ️ Sobre</h2> }
function Yugioh() { return <h2>📖 Yu-Gi-Oh!</h2> }

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">Home</Link> | <Link to="/About">Sobre</Link> | <Link to="/Yu-Gi-Oh">Yu-Gi-Oh!</Link>
      </nav>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Yu-Gi-Oh" element={<Yugioh />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
)}  
