import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Button from '../../components/Common/Button'
import Card from '../../components/Common/Card'

export default function LoginPage() {
  const router = useRouter()

  const handleGoogleLogin = async () => {
    const result = await signIn('google', { redirect: false })
    if (result?.ok) {
      router.push('/dashboard')
    }
  }

  return (
    <>
      <Head>
        <title>Login – Gym Progress Tracker</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-lighter flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 text-white">💪 Gym Progress Tracker</h1>
            <p className="text-gray-400 mb-8">Track your fitness journey</p>
            <button 
              onClick={handleGoogleLogin}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            >
              Sign in with Google
            </button>
          </div>
        </Card>
      </div>
    </>
  )
}
