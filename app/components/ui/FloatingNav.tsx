'use client'
import React, { useState } from 'react'
import { cn } from '@/utils/cn'
import Link from 'next/link'
import { WaitlistModal } from './WaitlistModal'

export const FloatingNav = ({
  navItems,
  className
}: {
  navItems: {
    name: string
    link: string
    icon?: JSX.Element
  }[]
  className?: string
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div
        className={cn(
          'flex max-w-fit fixed top-7 right-7 border-2 border-[#191c26] rounded-xl bg-white/0 backdrop-blur-lg z-[5000] pr-2 pl-4 py-2 items-center justify-center space-x-7 shadow-md shadow-black',
          className
        )}
      >
        {navItems.map((navItem, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'relative items-center flex space-x-1 text-white/70 hover:text-white transition-colors duration-200'
            )}
          >
            {navItem.icon && <span>{navItem.icon}</span>}
            <span className="text-sm">{navItem.name}</span>
          </Link>
        ))}
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-sm font-medium relative bg-[#191c26] hover:bg-[#1f2433] text-white px-4 py-1.5 rounded-xl transition-colors duration-200"
        >
          <span>Waitlist</span>
        </button>
      </div>

      <WaitlistModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  )
}
