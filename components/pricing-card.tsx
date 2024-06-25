'use client'
import { Check, Sparkle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Logo } from './logo'

// Update Tiers Here
export const tiers = [
  {
    name: 'Kindle Store',
    price: '$1000+',
    features: [
      'Expensive Books $1000+',
      'Limited Access to Free Books',
      'No Free Audiobooks',
      'Regional Restrictions',
      'No Customer Support',
      'No Community',
      'No Customization',
      'No Early Access'
    ],
    cta: 'Get Started',
    yourProduct: false
  },
  {
    name: 'Books Kindle Premium',
    priceBefore: '$59.99',
    price: '29.99',
    features: [
      'Thousands of Free Books',
      'Thousands of Free Audiobooks',
      'No Regional Restrictions',
      'Lifetime updates',
      'Customer Support',
      'Community',
      'Customization',
      'Early Access'
    ],
    cta: 'Get Started',
    yourProduct: true
  }
]

export const PricingCard = () => {
  const [isLoading, setIsLoading] = useState(false)
  const session = useCurrentUser()

  const router = useRouter();

  const onClick = async () => {
    if (!session) {
      toast('👇 Sign in to purchase!')
      router.push('/login')
      return
    }
    try {
      setIsLoading(true)
      const response = await axios.post('/api/checkout')
      window.location.href = response.data.url
    } catch (error) {
      toast.error('An error occured! Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <section id="pricing" className="scroll-mt-4">
      {/* Title */}
      <div className="mx-auto flex flex-col items-center pb-8">
      <div className="flex items-center pb-4 text-xl font-extrabold text-foreground">
    <Link href="/">
        <Logo />
    </Link>
    <span className="ml-1">Pricing</span>
</div>

        <p className="text-md opacity-50 max-w-lg text-center">
          Choose the right plan for your needs.
        </p>
      </div>
      {/* Pricing Card Display */}
      <div className="flex flex-col sm:place-items-center md:flex-row items-center justify-center gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative flex flex-col p-6 shadow-lg rounded-lg justify-between ring-2 ring-inset w-full max-w-[550px]  ${
              tier.yourProduct
                ? 'bg-primary/10 ring-primary/50'
                : 'bg-secondary ring-foreground/10'
            }`}
          >
            {tier.yourProduct && (
              <div className="px-3 py-1 text-primary-foreground text-sm bg-primary rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                Popular
              </div>
            )}
            {/* Pricing */}
            <div>
              <h3
                className={`text-lg font-semibold ${
                  tier.yourProduct ? 'text-primary' : 'text-foreground/70'
                }`}
              >
                {tier.name}
              </h3>
              <div
                className={`mt-4 ${
                  tier.yourProduct ? 'text-foreground/90' : 'text-foreground/70'
                }`}
              >
                {tier.priceBefore ? (
                  <span className="font-semibold mr-2 line-through text-lg opacity-75">
                    {tier.priceBefore}
                  </span>
                ) : null}
<span className="text-4xl font-bold">
  {tier.name === 'Kindle Store' ? `${tier.price}/month` : `$${tier.price} `}
</span>

              </div>
              <ul className="mt-4 space-y-2.5">
                {tier.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-foreground/90 gap-2"
                  >
                    <Check
                      className={`h-6 w-6 rounded-full ${
                        tier.yourProduct ? 'text-primary' : 'text-foreground/70'
                      }`}
                    />
                    {feature}
                  </li>
                ))}
  {!tier.yourProduct ? '' : 
<div className='mt-1'>
<span className="badge badge-accent select-none bg-green-500 text-white ml-1 rounded-full p-1 text-sm">
  Updated 26 days ago
</span>
</div>

}

              </ul>
            </div>
            {/* Button */}
            <div className="mt-6 space-y-2">
              <Button
                disabled={!tier.yourProduct}
                onClick={onClick}
                className={`w-full ${tier.yourProduct && 'hover:-translate-y-1'}`}
              >
                {tier.cta}
               {isLoading == true ? '...' :  <Sparkle className="ml-1 h-4 w-4" />}
               

              </Button>  
              <div className='text-sm text-center text-base-content-secondary font-medium relative'>
            {!tier.yourProduct ? '' : 
            <span>One-time payment, then <span className="underline">it's yours forever</span></span> }
           
            </div>
            </div>
          
          </div>
        ))}
      </div>
    </section>
  )
}



