import MyLogo from '.././public/kindle.svg'
import Image from 'next/image'

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 group">
      <div className="w-12 h-12 text-primary group-hover:-rotate-12 transition-all duration-300">
        <Image src={MyLogo} alt="YourCompany" width={40} height={40} className="rounded-lg" />
      </div>
      <span className="text-xl group-hover:translate-x-0.5 transition-all duration-300">
        BooksKindle
      </span>
    </div>
  )
}
