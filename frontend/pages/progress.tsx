import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Card from '../components/Common/Card'
import workoutAPI from '../utils/api'

interface ProgressEntry {
  id?: string
  weight: number
  height: number
  notes?: string
  photo_url?: string
  created_at?: string
}

export default function Progress() {
  const { data: session } = useSession()
  const [progressList, setProgressList] = useState<ProgressEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<ProgressEntry>({
    weight: 0,
    height: 0,
    notes: '',
  })

  useEffect(() => {
    if (session) {
      fetchProgress()
    }
  }, [session])

  const fetchProgress = async () => {
    try {
      setLoading(true)
      const res = await workoutAPI.get('/api/progress')
      setProgressList(res.data || [])
    } catch (error) {
      console.error('Error fetching progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.weight || !formData.height) {
      alert('Please fill in all required fields')
      return
    }

    try {
      setLoading(true)
      await workoutAPI.post('/api/progress', formData)
      
      // Reset form
      setFormData({
        weight: 0,
        height: 0,
        notes: '',
      })
      
      // Refresh list
      await fetchProgress()
      alert('Progress recorded successfully!')
    } catch (error) {
      console.error('Error saving progress:', error)
      alert('Error saving progress')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return
    
    try {
      await workoutAPI.delete(`/api/progress?id=${id}`)
      await fetchProgress()
      alert('Entry deleted successfully!')
    } catch (error) {
      console.error('Error deleting progress:', error)
      alert('Error deleting entry')
    }
  }

  if (!session) return null

  return (
    <>
      <Head>
        <title>Body Progress – Gym Progress Tracker</title>
      </Head>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Body Progress 📊</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <Card>
            <h2 className="text-2xl font-bold mb-6 text-white">Log Progress</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Weight (kg) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  required
                  value={formData.weight || ''}
                  onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                  className="w-full bg-navy-lighter border border-navy-lighter rounded-lg px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your weight"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Height (cm) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  required
                  value={formData.height || ''}
                  onChange={(e) => setFormData({ ...formData, height: parseFloat(e.target.value) })}
                  className="w-full bg-navy-lighter border border-navy-lighter rounded-lg px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your height"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-navy-lighter border border-navy-lighter rounded-lg px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Add any notes about your progress..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
              >
                {loading ? 'Saving...' : 'Log Progress'}
              </button>
            </form>
          </Card>

          {/* Progress History */}
          <Card>
            <h2 className="text-2xl font-bold mb-6 text-white">Progress History</h2>
            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : progressList.length === 0 ? (
              <p className="text-gray-400">No progress entries yet. Start logging!</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {progressList.map((entry, index) => (
                  <div key={entry.id || index} className="bg-navy rounded-lg p-4 border border-navy-lighter">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-white">{entry.weight} kg</p>
                        <p className="text-sm text-gray-400">{entry.height} cm</p>
                      </div>
                      <button
                        onClick={() => entry.id && handleDelete(entry.id)}
                        className="text-red-400 hover:text-red-500 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                    {entry.notes && (
                      <p className="text-sm text-gray-300 mb-2">{entry.notes}</p>
                    )}
                    {entry.created_at && (
                      <p className="text-xs text-gray-500">
                        {new Date(entry.created_at).toLocaleDateString()}
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
