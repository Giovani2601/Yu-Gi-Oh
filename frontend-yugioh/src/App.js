// src/App.js
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import Navbar from "./components/navbar/Navbar"
import CardList from './components/cardList/CardList'
import Home from './components/home/Home'

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
