import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import Carousel  from '@/components/carousel-books'
import { PricingCard } from '@/components/pricing-card'
import { Testimonials } from '@/components/testimonials'
import { Tired } from '@/components/tired'
import Why from '@/components/why'
import { ThemeProvider } from 'next-themes'

export default function Home() {
  return (
    <>
    <ThemeProvider attribute="class">
    <main className="w-full max-w-6xl px-6 space-y-40">
        <Header />
        <Tired/>
        <Why/>
        <PricingCard />      
        {/* <Carousel /> */}
        <Testimonials />
      </main>
      <Footer />
    </ThemeProvider>
 
    </>
  )
}
