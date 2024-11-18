import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="bg-black">
      <section className=" flex items-end justify-center min-h-[400px] pt-12 pb-0">
        <h1
          className="font-silkscreen font-bold text-[#1f2433] tracking-[20px] m-0
        text-[65px] sm:text-[150px] md:text-[200px] lg:text-[250px]
        transition-all duration-300 ease-in-out"
        >
          Knotron
        </h1>
      </section>
      <p className="py-2 text-center">
        By creating an account, you agree to the{' '}
        <Link href="/policy" className="underline cursor-pointer text-white">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  )
}

export default Footer
