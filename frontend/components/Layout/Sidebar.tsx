import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'

export default function Sidebar() {
  const { data: session } = useSession()
  const router = useRouter()

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/progress', label: 'Progress', icon: '📈' },
    { href: '/equipment', label: 'Progress with Dedek', icon: '👨‍🏫' },
    { href: '/quotes', label: 'Motivation', icon: '💪' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <aside className="bg-navy-light border-r border-navy-lighter h-screen w-64 p-6 flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Gym Tracker</h2>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map(item => (
          <Link 
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              router.pathname === item.href
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-navy-lighter'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {session && (
        <div className="border-t border-navy-lighter pt-4">
          <p className="text-sm text-gray-400">{session.user?.email}</p>
        </div>
      )}
    </aside>
  )
}
