// src/App.js
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import './App.css'
import Navbar from "./components/navbar/Navbar"

function Home()    { return <h2>Home</h2> }
function CardList() { return <h2>Cards</h2> }

export default function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<CardList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
)}  
