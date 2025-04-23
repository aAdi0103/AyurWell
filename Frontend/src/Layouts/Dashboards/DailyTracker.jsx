import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { axiosInstance } from '../../lib/axios'
import { Loader } from 'lucide-react'

const DailyTracker = () => {
  const [sleep, setSleep] = useState('')
  const [water, setWater] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!sleep || !water) {
      toast.error('Please fill in both fields')
      return
    }

    setIsLoading(true)

    try {
      const res = await axiosInstance.post('/update/sleep', {
        sleep: parseFloat(sleep),
        water: parseFloat(water),
      })

      toast.success('Daily data submitted!')
      setSleep('')
      setWater('')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-xl mx-auto space-y-6 bg-white shadow-md rounded-xl border mt-10"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Daily Health Tracker</h2>

      {/* Sleep Input */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Sleep Duration (in hours)
        </label>
        <input
          type="number"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
          placeholder="e.g. 7.5"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      {/* Water Intake Input */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Water Intake (in liters)
        </label>
        <input
          type="number"
          value={water}
          onChange={(e) => setWater(e.target.value)}
          placeholder="e.g. 2.5"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-blue-600 text-white py-2 hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {isLoading ? <Loader className="mx-auto size-5 animate-spin" /> : 'Submit'}
      </button>
    </form>
  )
}

export default DailyTracker
