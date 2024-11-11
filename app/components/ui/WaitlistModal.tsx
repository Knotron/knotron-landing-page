import React, { useState } from 'react'
import Image from 'next/image'

export const WaitlistModal = ({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) => {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      await fetch('https://app.knotron.com/api/waitlist', {
        method: 'POST',
        body: JSON.stringify({ email })
      })
    }
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative bg-[#0c0d10] border border-[#1f2433] rounded-xl w-full max-w-md mx-4 p-6 z-[9999]">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>

        <div className="flex justify-center mb-4">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            className="invert"
          />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl text-white font-medium mb-2">
            Request access to Knotron.
          </h2>
          <p className="text-sm text-gray-400">
            Automate your work life, let AI do the boring and hard stuff.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="hello@example.com"
            className="w-full bg-[#191c26] border border-[#2a2d36] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-xl hover:bg-gray-100 transition-colors font-medium"
          >
            Join the waitlist
          </button>
        </form>
      </div>
    </div>
  )
}
