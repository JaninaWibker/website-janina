import { Heading1 } from '@/components/Basic'

const ColorShowcase = () => {
  const numbers = Array.from({ length: 12 }, (_, i) => `${i + 1}`)

  const primaryColors = numbers.map((num) => `bg-primary-${num}`)
  const secondaryColors = numbers.map((num) => `bg-secondary-${num}`)
  const negativeColors = numbers.map((num) => `bg-negative-${num}`)
  const neutralColors = numbers.map((num) => `bg-neutral-${num}`)
  const positiveColors = numbers.map((num) => `bg-positive-${num}`)

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex gap-2">
        {primaryColors.map((color) => (
          <div key={color} className={`${color} size-12`} />
        ))}
      </div>
      <div className="flex gap-2">
        {secondaryColors.map((color) => (
          <div key={color} className={`${color} size-12`} />
        ))}
      </div>
      <div className="flex gap-2">
        {negativeColors.map((color) => (
          <div key={color} className={`${color} size-12`} />
        ))}
      </div>
      <div className="flex gap-2">
        {neutralColors.map((color) => (
          <div key={color} className={`${color} size-12`} />
        ))}
      </div>
      <div className="flex gap-2">
        {positiveColors.map((color) => (
          <div key={color} className={`${color} size-12`} />
        ))}
      </div>
    </div>
  )
}

const Home = () => {
  return (
    <main>
      <Heading1 underlined>who am i?</Heading1>

      <ColorShowcase />
    </main>
  )
}

export default Home
