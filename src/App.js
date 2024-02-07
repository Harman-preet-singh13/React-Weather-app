import "./App.css";
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import AdminTable from "./components/AdminTable";



export default function App() {



  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="admin" element={<AdminTable />} />
      </Routes>
    </BrowserRouter>
  )
}


