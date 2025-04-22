import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: loginMutation, isLoading } = useMutation({
    mutationFn: (userData) => axiosInstance.post('/auth/login', userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] })
      navigate('/dashboard')
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Something went wrong')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    loginMutation({ email, password })
  }

  return (
  
  <div className="flex min-h-screen items-center justify-center bg-[#f6efe2] px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-3xl border border-[#E2C799] bg-[#fffdf8] p-8 shadow-xl" style={{
        backgroundImage: 'url(/ayurvedic-pattern.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom right',
        fontFamily: `'Merriweather', serif`,
      }}>
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-[#5D3A00]">Login to Continue</h2>
          <p className="mt-2 text-sm text-[#7A5F32]">
            Welcome back! Please enter your credentials to continue your wellness journey.
          </p>
        </div>

        <form
      onSubmit={handleSubmit}
      style={{
        fontFamily: `'Merriweather', serif`,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      className="flex  w-full max-w-md flex-col gap-5 rounded-2xl border border-green-200 bg-gradient-to-br from-[#fdf6e3] to-[#f1efe3] p-6 shadow-md"
    >
      <h2 className="mb-[-16px] text-center text-3xl font-semibold text-[#4B3F2F]">
        🌿 Join the Ayurvedic Way
      </h2>
      <p className="text-center text-sm text-[#6f5e42]">
        Embrace balance and wellness with your new account.
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
        {isLoading ? <Loader className="mx-auto size-5 animate-spin" /> : 'Agree & Join'}
      </button>

      <p className="text-center text-sm text-[#6f5e42]">
        Already have an account?{' '}
        <a href="/signup" className="font-semibold text-green-600 hover:underline">
          Sign In
        </a>
      </p>
    </form>

        <p className="mt-6 text-center text-sm text-[#7A5F32]">
          Don't have an account?{' '}
          <a href="/signup" className="font-medium text-[#A47149] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
