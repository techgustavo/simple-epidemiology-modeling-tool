import { Form } from '@/components/Form'
import { SirdChart } from '@/components/sirdChart'

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col items-center">
      <h1 className="p-9 text-2xl font-bold">Simple viral modeling tool</h1>
      <Form />
      <div className="flex h-2/3 w-full max-w-4xl flex-col items-center justify-center align-middle">
        <SirdChart
          beta={1}
          gamma={0.3}
          mu={0.1}
          population={1000}
          infected={1}
          recovered={100}
          dead={300}
          days={50}
        />
      </div>
    </div>
  )
}
