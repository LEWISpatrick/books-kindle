import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import Carousel  from '@/components/carousel-books'
import { PricingCard } from '@/components/pricing-card'
import { Testimonials } from '@/components/testimonials'
import { Tired } from '@/components/tired'
import Why from '@/components/why'
export default function Home() {
  return (
    <>
      <main className="w-full max-w-6xl px-6 space-y-40">
        <Header />
        <Tired/>
        <Why/>
        <PricingCard />      
        {/* <Carousel /> */}
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
