'use client'
import {  useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useRouter } from 'next/navigation'

const Page = () => {
  const session = useCurrentUser()
  const router = useRouter()

  const onClick = () => {
    if (!session) {
      toast('👇 Sign in to access!')
      router.push('/login')
      return
    }
    // Additional actions can be placed here if needed
  }

  useEffect(() => {
    onClick()
  }, [session])

  return (
    <h2 className="text-center font-extrabold text-4xl md:text-5xl tracking-tight mb-12 md:mb-20">
      Coming Soon...
    </h2>
  )
}

export default Page
