import { SirdChart } from '@/components/sirdChart'
import { Footer } from '@/components/Footer'
import { Form } from '@/components/Form'
import { ValuesProvider } from '@/contexts/values'

export default function Home() {
  return (
    <ValuesProvider>
      <div className="flex min-h-screen w-full flex-col items-center">
        <div className="p-16">
          <h1 className="text-3xl font-bold text-black">
            Simple epidemiology modeling tool
          </h1>
          <div className="mt-2 flex items-center">
            <span className="peer mr-2 h-6 border-l-2 border-gray-400"></span>
            <a
              href="https://github.com/techgustavo/simple-epidemiology-modeling-tool"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-gray-400"
            >
              How it works?
            </a>
          </div>
        </div>
        <div className="max-w-3xl">
          <Form />
        </div>
        <div className="flex w-full max-w-4xl flex-col items-center justify-center align-middle">
          <SirdChart />
        </div>
      </div>
      <Footer />
    </ValuesProvider>
  )
}
