import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { toast, Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios'
import Homepage from './Layouts/Homepage'
import LoginPage from './Components/LoginForm';
import SignPage from './Components/SignForm';
import Dashboard from './Components/Dashboard';
import Page3 from './Layouts/Dashboards/Page3';
import Yoga from './Layouts/Dashboards/Yoga';
function App() {

  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get('/auth/me')
        return res.data
      } catch (err) {
        if (err.response && err.response.status === 401) {
          return null
        }
        toast.error(err.response.data.message || 'Something went wrong')
      }
    },
  })

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={'/'} />}></Route>
        <Route path="/signup" element={!authUser ? <SignPage /> : <Navigate to={'/'} />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    
    </>
  )
}

export default App
