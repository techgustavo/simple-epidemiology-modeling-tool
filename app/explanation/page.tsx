import { Footer } from '@/components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center">
        <div className="m-16">
          <h1 className="text-3xl font-bold text-black">
            Simple Epidemiology Modeling Tool
          </h1>
          <div className="mt-2 flex items-center">
            <span className="mr-2 h-6 border-l-2 border-gray-400"></span>
            <Link href={'/'} className="text-xl text-gray-400">
              Return
            </Link>
          </div>
        </div>
        Work in progress...
      </div>
      <Footer />
    </>
  )
}
