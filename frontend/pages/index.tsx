import Head from 'next/head'
import { useSession, signIn } from 'next-auth/react'
import Card from '../components/Common/Card'

export default function Home() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <>
        <Head>
          <title>Gym Progress Tracker</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-lighter flex items-center justify-center p-4">
          <div className="text-center max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-6">💪 Gym Progress Tracker</h1>
            <p className="text-xl text-gray-300 mb-8">Track your workout progress, monitor body changes, and stay motivated on your fitness journey.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <div className="bg-navy-light rounded-lg p-6 border border-navy-lighter">
                <p className="text-3xl mb-2">📊</p>
                <h3 className="font-bold mb-2 text-white">Track Progress</h3>
                <p className="text-sm text-gray-400">Monitor your weight and body measurements</p>
              </div>
              <div className="bg-navy-light rounded-lg p-6 border border-navy-lighter">
                <p className="text-3xl mb-2">💪</p>
                <h3 className="font-bold mb-2 text-white">Log Workouts</h3>
                <p className="text-sm text-gray-400">Record your exercises and performance</p>
              </div>
              <div className="bg-navy-light rounded-lg p-6 border border-navy-lighter">
                <p className="text-3xl mb-2">🏃</p>
                <h3 className="font-bold mb-2 text-white">Stay Motivated</h3>
                <p className="text-sm text-gray-400">Get daily inspiration and quotes</p>
              </div>
            </div>
            
            <button
              onClick={() => signIn('google')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition duration-200 inline-flex items-center gap-2"
            >
              <span>🔐</span> Sign in with Google
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Gym Progress Tracker - Dashboard</title>
      </Head>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white">Welcome, {session.user?.name}! 👋</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <h3 className="text-lg font-semibold mb-2">Current Weight</h3>
            <p className="text-3xl font-bold text-blue-400">-- kg</p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold mb-2">Body Progress</h3>
            <p className="text-3xl font-bold text-green-400">0</p>
            <p className="text-sm text-gray-400">photos</p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold mb-2">Workouts</h3>
            <p className="text-3xl font-bold text-purple-400">0</p>
            <p className="text-sm text-gray-400">logged</p>
          </Card>
        </div>

        <Card>
          <h2 className="text-2xl font-bold mb-4">Latest Progress</h2>
          <p className="text-gray-400">No progress logged yet. Get started by uploading a photo!</p>
        </Card>
      </div>
    </>
  )
}
