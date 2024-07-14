import axios from 'axios'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'

export const PurchaseButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [hasPurchased, setHasPurchased] = useState(false)

  

  const onClick = async () => {
    if (hasPurchased) {
      // User has already purchased
      toast.success('You have already purchased!')
      return
    }

    try {
      setIsLoading(true)
      const response = await axios.post('/api/checkout')
      if (response.status === 400) {
        toast.success('Already bought 😊')
        setHasPurchased(true) // Update state to reflect the purchase status
      } else {
        window.location.href = response.data.url
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={onClick} disabled={isLoading || hasPurchased}>
      {isLoading ? 'Loading...' : (hasPurchased ? 'Already bought 😊' : 'Purchase')}
    </Button>
  )
}
