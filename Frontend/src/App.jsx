import { Routes, Route} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { toast, Toaster } from 'react-hot-toast'

import Homepage from './Layouts/Homepage'

function App() {

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage/>} />
      </Routes>
    </>
  )
}

export default App
