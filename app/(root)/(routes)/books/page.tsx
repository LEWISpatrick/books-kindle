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
    <div className='flex  '>
      

   
  
         <button
            className=" text-4xl flex items-center hover:text-primary hover:bg-primary/10 h-full transition duration-300 px-4 rounded-md"
            onClick={() => (window.location.href = '/upload-books')}
          >
            Upload Books
          </button>
        
       
    </div>
    
  )
}

export default Page
