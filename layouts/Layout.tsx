import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <main className="flex flex-col items-center justify-center h-full font-serif text-white">{children}</main>
    </div>
  )
}
