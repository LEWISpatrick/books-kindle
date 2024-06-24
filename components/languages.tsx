'use client'
import Marquee from 'react-fast-marquee'
const languages = [
  {
    label: 'Stripe',
    icon: '/books/harrypotter.jpg',
    className: 'w-36 h-auto aspect-square'
  },
  {
    label: 'Resend',
    icon: '/books/harrypotter.jpg',   
     className: 'w-36 p-5 h-auto aspect-square'
  },
  {
    label: 'TailwindCSS',
    icon: '/books/harrypotter.jpg',
    className: 'w-48 px-5 h-auto aspect-square'
  },
  {
    label: 'NextJS',
    icon: '/books/harrypotter.jpg',
    className: 'w-36 p-5 h-auto aspect-square'
  }
]

export function Language() {
  return (
    <section className="relative">
      <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-background pointer-events-none z-10"></div>
      <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-r from-transparent to-background pointer-events-none z-10"></div>
      <Marquee speed={30} autoFill>
        {languages.map((language, i) => (
          <img
            key={i}
            src={language.icon}
            alt={language.label}
            className={`${language.className} text-foreground opacity-50 hover:opacity-100 transition duration-300 ml-32 cursor-pointer`}
          />
        ))}
      </Marquee>
    </section>
  )
}
