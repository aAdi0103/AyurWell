import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '../lib/axios'
import { toast } from 'react-hot-toast'
import { Loader } from 'lucide-react'

const SignUpForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const queryClient = useQueryClient()

  const { mutate: signUpMutation, isLoading } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post('/auth/signup', data)
      return res.data
    },
    onSuccess: () => {
      toast.success('Account created successfully')
      queryClient.invalidateQueries({ queryKey: ['authUser'] })
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Something went wrong')
    },
  })

  const handleSignUp = (e) => {
    e.preventDefault()
    signUpMutation({ name, email, password })
  }

  return (
    <form
      onSubmit={handleSignUp}
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
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-lg border border-[#c4b395] bg-[#fefbf6] px-4 py-3 text-[#4b3f2f] placeholder-[#b29b7a] focus:outline-none focus:ring-2 focus:ring-green-400"
        required
      />

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
        placeholder="Password (6+ characters)"
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
        <a href="/login" className="font-semibold text-green-600 hover:underline">
          Sign In
        </a>
      </p>
    </form>
  )
}
export default SignUpForm
