import { Heading1 } from '@/components/Basic'
import { UnorderedList, ListItem, Link, Strong } from '@/components/native-replacements'

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
    <main className="lowercase">
      <Heading1 underlined>who am i?</Heading1>
      Hi, I&apos;m Janina, 26 y/o student (cs and maths) and web dev :3
      <br />
      <br />
      Interested in all sorts of things including <Strong>design</Strong>, <Strong>ui</Strong>, <Strong>ux</Strong>,{' '}
      <Strong>web dev</Strong>, trains, lego, compilers, mechanical keyboards, <Strong>computer graphics</Strong>, type
      systems, embedded systems, ci/cd, graph theory (and maths in general), linux, cooking and more. Lover of{' '}
      <Strong>TypeScript</Strong> (w/ react) and <Strong>Typst</Strong> {'<3'}
      <br />
      <br />
      about me:
      <br />
      <UnorderedList>
        <ListItem>mostly Janina, sometimes Nina</ListItem>
        <ListItem>ProNouns™: she/her</ListItem>
        <ListItem>
          ADHD
          <span className="trans-gradient-stops bg-gradient-to-l dark:bg-clip-text dark:text-black/0"> Transfem </span>
          :3
        </ListItem>
        <ListItem>Location: Germany</ListItem>
        <ListItem>Age: 26</ListItem>
        <ListItem>
          Studying Computer Science & Maths at <Link href="https://kit.edu">KIT</Link>
        </ListItem>
        <ListItem>
          Working at <Link href="https://quantco.com">QuantCo</Link>
        </ListItem>
      </UnorderedList>
      <br />
      Mainly progamming in:
      <br />
      <UnorderedList>
        <ListItem>
          <Strong>TypeScript</Strong> {'<3'} and JavaScript :c
        </ListItem>
        <ListItem>
          <Strong>Typst</Strong> {'<3'}
        </ListItem>
        <ListItem>Python</ListItem>
        <ListItem>Bash, and the likes (we love YAML engineering for CI/CD {'<3'})</ListItem>
        <ListItem>(rarely in: Java, C, C++)</ListItem>
      </UnorderedList>
      <br />
      socials:
      <br />
      <UnorderedList>
        <ListItem>
          fedi: <Link href="https://chaos.social/@janina">@janina@chaos.social</Link>
        </ListItem>
        <ListItem>
          matrix: <Link href="https://matrix.to/#/@janina:entropia.de">@janina:entropia.de</Link>
        </ListItem>
        <ListItem>
          github: <Link href="https://github.com/JaninaWibker">JaninaWibker</Link>
        </ListItem>
        <ListItem>
          email: <Link href="mailto:me@janina.lol">me@janina.lol</Link>
        </ListItem>
      </UnorderedList>
      <ColorShowcase />
    </main>
  )
}

export default Home
