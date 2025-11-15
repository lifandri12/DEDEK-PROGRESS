import Head from 'next/head'
import Link from 'next/link'

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy-lighter flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <p className="text-2xl font-bold text-blue-400 mb-4">Page Not Found</p>
          <p className="text-gray-300 mb-8">The page you're looking for doesn't exist or has been moved.</p>
          
          <Link href="/">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
              ← Back to Home
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
