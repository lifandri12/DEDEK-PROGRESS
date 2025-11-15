import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Card from '../components/Common/Card'
import workoutAPI from '../utils/api'

const MUSCLE_GROUPS = ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core']

interface Workout {
  id?: string
  name: string
  category: string
  reps: number
  sets: number
  notes?: string
  created_at?: string
}

export default function Equipment() {
  const { data: session } = useSession()
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Workout>({
    name: '',
    category: 'Chest',
    reps: 0,
    sets: 0,
    notes: '',
  })

  useEffect(() => {
    if (session) {
      fetchWorkouts()
    }
  }, [session])

  const fetchWorkouts = async () => {
    try {
      setLoading(true)
      const res = await workoutAPI.get('/api/workouts')
      setWorkouts(res.data || [])
    } catch (error) {
      console.error('Error fetching workouts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.reps || !formData.sets) {
      alert('Please fill in all required fields')
      return
    }

    try {
      setLoading(true)
      await workoutAPI.post('/api/workouts', formData)
      
      // Reset form
      setFormData({
        name: '',
        category: 'Chest',
        reps: 0,
        sets: 0,
        notes: '',
      })
      
      // Refresh list
      await fetchWorkouts()
      alert('Workout logged successfully!')
    } catch (error) {
      console.error('Error saving workout:', error)
      alert('Error saving workout')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this workout?')) return
    
    try {
      await workoutAPI.delete(`/api/workouts?id=${id}`)
      await fetchWorkouts()
      alert('Workout deleted successfully!')
    } catch (error) {
      console.error('Error deleting workout:', error)
      alert('Error deleting workout')
    }
  }

  if (!session) return null

  return (
    <>
      <Head>
        <title>Progress with Dedek – Gym Progress Tracker</title>
      </Head>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Progress with Dedek 👨‍🏫</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <Card>
            <h2 className="text-2xl font-bold mb-6 text-white">Log Workout with Dedek</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Exercise <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-navy-lighter border border-navy-lighter rounded-lg px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Bench Press"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Muscle Group <span className="text-red-400">*</span>
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-navy-lighter border border-navy-lighter rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  {MUSCLE_GROUPS.map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sets <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.sets || ''}
                    onChange={(e) => setFormData({ ...formData, sets: parseInt(e.target.value) })}
                    className="w-full bg-navy-lighter border border-navy-lighter rounded-lg px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Reps <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.reps || ''}
                    onChange={(e) => setFormData({ ...formData, reps: parseInt(e.target.value) })}
                    className="w-full bg-navy-lighter border border-navy-lighter rounded-lg px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-navy-lighter border border-navy-lighter rounded-lg px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Add any notes..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
              >
                {loading ? 'Saving...' : 'Log Workout'}
              </button>
            </form>
          </Card>

          {/* Workout History */}
          <Card>
            <h2 className="text-2xl font-bold mb-6 text-white">Workout History</h2>
            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : workouts.length === 0 ? (
              <p className="text-gray-400">No workouts logged yet. Get started!</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {workouts.map((workout, index) => (
                  <div key={workout.id || index} className="bg-navy rounded-lg p-4 border border-navy-lighter">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-white">{workout.name}</p>
                        <p className="text-sm text-gray-400">{workout.category}</p>
                      </div>
                      <button
                        onClick={() => workout.id && handleDelete(workout.id)}
                        className="text-red-400 hover:text-red-500 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-300 mb-2">
                      <span>Sets: {workout.sets}</span>
                      <span>Reps: {workout.reps}</span>
                    </div>
                    {workout.notes && (
                      <p className="text-sm text-gray-300 mb-2">{workout.notes}</p>
                    )}
                    {workout.created_at && (
                      <p className="text-xs text-gray-500">
                        {new Date(workout.created_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  )
}
