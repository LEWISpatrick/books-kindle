import Link from 'next/link'
import { Logo } from '@/components/logo'
import { FileLock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="max-w-6xl w-full p-6">
      <div className="flex justify-center bg-secondary dark:bg-secondary/50 py-6 w-full rounded-xl">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 px-6">
          <Link href="/">
            <Logo />
          </Link>
          <span className="text-sm">
            &copy; 2024 BooksKindle. All rights reserved.
          </span>
          <Link href='privacy-policy'>

     <FileLock/>
       
          </Link>
        </div>
      </div>
    </footer>
  )
}
