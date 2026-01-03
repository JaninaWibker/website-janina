export const ColorShowcase = () => {
  const numbers = Array.from({ length: 12 }, (_, i) => `${i + 1}`)

  const primaryColors = numbers.map((num) => `rgb(var(--mauve-${num}))`)
  const secondaryColors = numbers.map((num) => `rgb(var(--fuchsia-${num}))`)
  const negativeColors = numbers.map((num) => `rgb(var(--tomato-${num}))`)
  const neutralColors = numbers.map((num) => `rgb(var(--amber-${num}))`)
  const positiveColors = numbers.map((num) => `rgb(var(--grass-${num}))`)

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex gap-2">
        {primaryColors.map((color) => (
          <div key={color} className="size-12" style={{ backgroundColor: color }} />
        ))}
      </div>
      <div className="flex gap-2">
        {secondaryColors.map((color) => (
          <div key={color} className="size-12" style={{ backgroundColor: color }} />
        ))}
      </div>
      <div className="flex gap-2">
        {negativeColors.map((color) => (
          <div key={color} className="size-12" style={{ backgroundColor: color }} />
        ))}
      </div>
      <div className="flex gap-2">
        {neutralColors.map((color) => (
          <div key={color} className="size-12" style={{ backgroundColor: color }} />
        ))}
      </div>
      <div className="flex gap-2">
        {positiveColors.map((color) => (
          <div key={color} className="size-12" style={{ backgroundColor: color }} />
        ))}
      </div>
    </div>
  )
}
