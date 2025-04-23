import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'
import { useAuth } from '../Context/AuthContext'
const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
const { setAuthUser } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axiosInstance.post('/auth/login', { email, password })
      
    
      if (response?.data){
        toast.success(response?.data?.message)
        navigate('/dashboard')
        localStorage.setItem("authUser", JSON.stringify(response?.data?.data)); // Store user data
        localStorage.setItem("authToken", response?.data?.token); // Optionally store token
        setAuthUser(response?.data?.data);
      }
      
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong sir')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6efe2] px-4 py-10 sm:px-6 lg:px-8">
      <div
        className="w-full max-w-md rounded-3xl border border-[#E2C799] bg-[#fffdf8] p-8 shadow-xl"
        style={{
          backgroundImage: 'url(/ayurvedic-pattern.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom right',
          fontFamily: `'Merriweather', serif`,
        }}
      >
   

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-5 rounded-2xl border border-green-200 bg-gradient-to-br from-[#fdf6e3] to-[#f1efe3] p-6 shadow-md"
          style={{
            fontFamily: `'Merriweather', serif`,
          }}
        >
          <h2 className="mb-[-16px] text-center text-3xl font-semibold text-[#4B3F2F]">
            🌿 Welcome Back
          </h2>
          <p className="text-center text-sm text-[#6f5e42]">
            Log in to access your wellness dashboard.
          </p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-[#c4b395] bg-[#fefbf6] px-4 py-3 text-[#4b3f2f] placeholder-[#b29b7a] focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-[#c4b395] bg-[#fefbf6] px-4 py-3 text-[#4b3f2f] placeholder-[#b29b7a] focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-gradient-to-r from-[#8bc34a] to-[#689f38] py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 disabled:opacity-50"
          >
            {isLoading ? <Loader className="mx-auto size-5 animate-spin" /> : 'Login'}
          </button>

          <p className="text-center text-sm text-[#6f5e42]">
            Don’t have an account?{' '}
            <a href="/signup" className="font-semibold text-green-600 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
