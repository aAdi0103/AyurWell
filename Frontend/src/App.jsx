import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { toast, Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { axiosInstance } from './lib/axios'
import { useAuth } from './Context/AuthContext'
import Homepage from './Layouts/Homepage'
import LoginPage from './Components/LoginForm'
import SignPage from './Components/SignForm'
import Dashboard from './Components/Dashboard'
import Quiz from './Layouts/Dashboards/Quiz'
 

function App() {
 

  const { authUser, setAuthUser, isLoading } = useAuth();
  
  if (isLoading) return null 
  // console.log(authUser)

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!authUser ? <SignPage /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />  
        <Route path="/quiz" element={!authUser ? <LoginPage/> :<Quiz/>} /> 
      </Routes>
    </>
  )
}

export default App
