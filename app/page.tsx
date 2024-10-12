import { Form } from '@/components/Form'
import { SirdChart } from '@/components/sirdChart'
import { ValuesProvider } from '@/contexts/values'

export default function Home() {
  return (
    <ValuesProvider>
      <div className="flex h-screen w-full flex-col items-center">
        <h1 className="p-9 text-2xl font-bold">Simple viral modeling tool</h1>
        <Form />
        <div className="flex h-2/3 w-full max-w-4xl flex-col items-center justify-center align-middle">
          <SirdChart />
        </div>
      </div>
    </ValuesProvider>
  )
}
