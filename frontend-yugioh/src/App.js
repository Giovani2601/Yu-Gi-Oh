// src/App.js
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import './App.css'
import Navbar from "./components/navbar/navbar"

function Home()    { return <h2>Home</h2> }
function Cards() { return <h2>Cards</h2> }

export default function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
)}  
