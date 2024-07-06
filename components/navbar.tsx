'use client'
import Link from 'next/link'
import Image from 'next/image'
import { UserButton } from '@/components/user-button'
import { MobileSidebar } from '@/components/mobile-sidebar'
import { Logo } from '@/components/logo'
import { useCurrentUser } from '@/hooks/use-current-user'
import router, { useRouter } from 'next/router'
import { useState } from 'react'

import { toast } from 'react-hot-toast'
import axios from 'axios'


export const navPages = [
  {
    title: 'Books',
    link: '/books' 
  },
  {
    title: 'Convert pdf',
    link: '/convert' 
  },


]

export const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false)

  const session = useCurrentUser()


  const onClick = async () => {
    if (!session) {
      toast('👇 Sign in to Access!')
      router.push('/register')
      return
      
    }
    try {
      setIsLoading(true)
    } catch (error) {
      toast.error('An error occured! Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <nav className="top-0 w-full z-50 transition">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <MobileSidebar />
          {/* Logo */}
          <Link href="/">
            <Logo />
          </Link>
          {/* Links, Theme, & User */}
          <div className="hidden sm:flex h-[40px] items-center text-lg md:text-lg font-medium gap-4 transition-all">
            <div className="flex items-center h-full text-base font-medium">
              {navPages.map((page, index) => (
                <Link
                  key={index}
                  href={page.link}
                  className="flex items-center hover:text-primary hover:bg-primary/10 h-full transition duration-300 px-4 rounded-md"
                  onClick={onClick} 
                >
                  {page.title}
                </Link>
              ))}
            </div>
            <div className="flex h-full gap-4">
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
