import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Sidebar from './Sidebar'

const noSidebarRoutes = ['/auth/login']
const publicRoutes = ['/auth/login', '/']

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const showSidebar = session && !noSidebarRoutes.includes(router.pathname)
  const isPublicRoute = publicRoutes.includes(router.pathname)

  if (status === 'loading') {
    return <div className="flex items-center justify-center h-screen text-white">Loading...</div>
  }

  if (!session && !isPublicRoute) {
    router.push('/auth/login')
    return null
  }

  return (
    <div className="flex min-h-screen bg-navy">
      {showSidebar && <Sidebar />}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
