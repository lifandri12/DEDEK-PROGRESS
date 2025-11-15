import Head from 'next/head'
import Link from 'next/link'

export default function Error500() {
  return (
    <>
      <Head>
        <title>500 - Server Error</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-lighter flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-red-400 mb-4">500</h1>
          <p className="text-2xl font-bold text-white mb-4">Server Error</p>
          <p className="text-gray-300 mb-8">Something went wrong on our end. Please try again later.</p>
          
          <div className="space-y-3">
            <Link href="/">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
                ← Back to Home
              </button>
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
            >
              🔄 Refresh Page
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
