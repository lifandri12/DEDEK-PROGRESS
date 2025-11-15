import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Card from '../components/Common/Card'

export default function Settings() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  if (!session) {
    return <div className="p-4 text-center text-white">Loading...</div>
  }

  return (
    <>
      <Head>
        <title>Settings – Gym Progress Tracker</title>
      </Head>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Settings ⚙️</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6 text-white">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <p className="text-white text-lg">{session.user?.name || 'Not set'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <p className="text-white text-lg">{session.user?.email || 'Not set'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Account Provider</label>
                <p className="text-white text-lg">Google</p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-6 text-white">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Dark Theme</span>
                <span className="text-blue-400">✓ Enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Email Notifications</span>
                <span className="text-gray-500">Coming soon</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Data Backup</span>
                <span className="text-gray-500">Coming soon</span>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-6 text-white">Security</h2>
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Your account is secured with Google OAuth 2.0. For additional security measures, please visit your Google account settings.
              </p>
              <a
                href="https://myaccount.google.com/security"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
              >
                Google Account Security →
              </a>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-6 text-white">Danger Zone</h2>
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Logging out will end your current session. You'll need to sign in again to access your data.
              </p>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
              >
                🚪 Logout
              </button>
            </div>
          </Card>
        </div>

      </div>
    </>
  )
}
