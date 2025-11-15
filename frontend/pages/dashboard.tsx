import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Card from '../components/Common/Card'
import workoutAPI from '../utils/api'

interface WorkoutStats {
  totalWorkouts: number
  totalSets: number
  totalReps: number
  averageExercisesPerSession: number
}

interface ProgressStats {
  latestWeight: number | null
  photos: number
  height: number | null
}

export default function Dashboard() {
  const { data: session } = useSession()
  const [workoutStats, setWorkoutStats] = useState<WorkoutStats>({
    totalWorkouts: 0,
    totalSets: 0,
    totalReps: 0,
    averageExercisesPerSession: 0,
  })
  const [progressStats, setProgressStats] = useState<ProgressStats>({
    latestWeight: null,
    photos: 0,
    height: null,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch workout stats
        const workoutRes = await workoutAPI.get('/api/workouts')
        const workouts = workoutRes.data || []
        
        if (workouts.length > 0) {
          const totalSets = workouts.reduce((sum: number, w: any) => sum + (w.sets || 0), 0)
          const totalReps = workouts.reduce((sum: number, w: any) => sum + (w.reps || 0), 0)
          setWorkoutStats({
            totalWorkouts: workouts.length,
            totalSets,
            totalReps,
            averageExercisesPerSession: Math.round(workouts.length / 5) || 0,
          })
        }

        // Fetch progress stats
        const progressRes = await workoutAPI.get('/api/progress')
        const progress = progressRes.data || []
        
        if (progress.length > 0) {
          const latest = progress[0]
          setProgressStats({
            latestWeight: latest.weight,
            photos: progress.length,
            height: latest.height,
          })
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    if (session) {
      fetchStats()
    }
  }, [session])

  if (!session) return null

  return (
    <>
      <Head>
        <title>Dashboard – Gym Progress Tracker</title>
      </Head>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Dashboard 📊</h1>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading your stats...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Total Workouts</p>
                    <p className="text-3xl font-bold text-blue-400">{workoutStats.totalWorkouts}</p>
                  </div>
                  <span className="text-4xl">💪</span>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Total Sets</p>
                    <p className="text-3xl font-bold text-green-400">{workoutStats.totalSets}</p>
                  </div>
                  <span className="text-4xl">⬆️</span>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Latest Weight</p>
                    <p className="text-3xl font-bold text-purple-400">
                      {progressStats.latestWeight ? `${progressStats.latestWeight} kg` : '--'}
                    </p>
                  </div>
                  <span className="text-4xl">⚖️</span>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Progress Photos</p>
                    <p className="text-3xl font-bold text-yellow-400">{progressStats.photos}</p>
                  </div>
                  <span className="text-4xl">📸</span>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <h2 className="text-2xl font-bold mb-4 text-white">Recent Activity</h2>
                <div className="space-y-4">
                  {workoutStats.totalWorkouts > 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <p>You have logged {workoutStats.totalWorkouts} workout(s)</p>
                      <p className="text-sm mt-2">Total: {workoutStats.totalSets} sets</p>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-8">No workouts logged yet</p>
                  )}
                </div>
              </Card>

              <Card>
                <h2 className="text-2xl font-bold mb-4 text-white">Your Stats</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Current Weight:</span>
                    <span className="text-white font-bold">
                      {progressStats.latestWeight ? `${progressStats.latestWeight} kg` : 'Not set'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Height:</span>
                    <span className="text-white font-bold">
                      {progressStats.height ? `${progressStats.height} cm` : 'Not set'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Progress Photos:</span>
                    <span className="text-white font-bold">{progressStats.photos}</span>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </>
  )
}
