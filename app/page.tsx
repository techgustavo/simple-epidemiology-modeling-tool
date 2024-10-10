import { SirdChart } from '@/components/sirdChart'

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center align-middle">
      <div className="h-auto w-full max-w-5xl">
        <SirdChart
          beta={1}
          gamma={0.3}
          mu={0.1}
          population={1000}
          infected={1}
          recovered={0}
          days={30}
        />
      </div>
    </div>
  )
}
