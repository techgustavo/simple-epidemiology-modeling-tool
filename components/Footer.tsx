import Image from 'next/image'

export const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-2 bg-gray-100 p-8">
      <div className="text-center">
        <h2 className="text-xl font-bold text-black">
          Simple viral modeling tool
        </h2>
        <a
          href="https://github.com/techgustavo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gustavo Rodrigues
        </a>
      </div>
      <a
        href="https://github.com/techgustavo/simple-viral-modeling-tool"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/github-mark.svg"
          width={35}
          height={35}
          draggable={false}
          alt="Github logo"
        />
      </a>
    </footer>
  )
}
