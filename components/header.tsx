import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

export const Header = () => {
  return (
    <div className="space-y-20 mt-32 mb-0">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center text-center lg:text-left ">
          <h2 className="text-4xl font-extrabold sm:text-5xl">
           Focus on Reading, not Buying books
          </h2>
          <p className="mt-4 text-lg text-foreground">
            Books kindle offers thousands
             of books for you to choose from.
          </p>
          <div className="flex justify-center lg:justify-start items-center mt-4">
            <Link href="/register">
              <Button className="gap-2">
                <Sparkles className="h-5 w-5" />
                <span>Get Started</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-lg overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/VIDEO_ID_HERE/"
            title="YouTube Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="w-full max-w-2xl h-auto aspect-video"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
