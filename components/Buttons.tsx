'use client'

import { Tooltip } from './Tooltip'

type Tile = { key: string; src: string; href?: string; text: string }

const buttons = [
  { key: 'janina', src: '/images/88x31/janina.gif', href: 'https://janina.lol', text: 'it meee :3' },
  { key: 'tea', src: '/images/88x31/tea.gif', href: 'https://tea.wtf/', text: 'insanely cool bean' },
  {
    key: 'tea makes games',
    src: '/images/88x31/tea-makes-games.gif',
    href: 'https://teamakes.games/',
    text: 'cool bean makes games'
  },
  { key: 'maia', src: '/images/88x31/maia.png', href: 'https://maia.crimew.gay/', text: 'maia' },
  {
    key: 'concrete neocities',
    src: '/images/88x31/concrete.gif',
    href: 'https://concrete.neocities.org/',
    text: 'brutalist aesthethiccc'
  },
  {
    key: 'arasaka cyberpsychosis',
    src: '/images/88x31/cyberpsychosis-arasaka.gif',
    href: 'https://datakra.sh/logs/cyberpunk-rpg-hoarding',
    text: 'I like distopian cyberpunk settings as a genre, but not irl pls'
  },
  {
    key: 'check out my github',
    src: '/images/88x31/github.png',
    href: 'https://github.com/JaninaWibker',
    text: 'JaninaWibker'
  },
  {
    key: 'libresprite',
    src: '/images/88x31/libresprite.png',
    href: 'https://libresprite.github.io/',
    text: 'libresprite <3'
  },
  { key: 'sdomi.pl', src: 'https://sdomi.pl/img/button.bmp', href: 'https://sdomi.pl/', text: 'sdomi' },
  {
    key: 'trans your gender',
    src: '/images/88x31/trans-your-gender.gif',
    href: 'https://diyhrt.market/',
    text: 'do it'
  },
  { key: 'hzd', src: '/images/88x31/hzd.png', text: 'I love horizon zero dawn' },
  {
    key: 'trans rights now',
    src: '/images/88x31/trans-rights-now.gif',
    text: 'I support trans rights and trans wrongs'
  },
  { key: 'made with macintosh', src: '/images/88x31/mac.webp', text: 'I love my puter' },
  { key: "you're telling me a queer coded this", src: '/images/88x31/queercoded.gif', text: 'yes it did' },
  {
    key: 'entropia hidden patterns',
    src: '/images/88x31/gpn23.gif',
    href: 'https://entropia.de/GPN23',
    text: 'GPN 23'
  },
  { key: 'css is difficult', src: '/images/88x31/css-is-difficult.gif', text: 'but I still love it' },
  {
    key: 'powered-by-estrogen',
    src: '/images/88x31/hrt.gif',
    href: 'https://diyhrt.info/',
    text: 'Backbone of the IT industry'
  },
  {
    key: '88x31 ',
    src: '/images/88x31/88x31.webp',
    href: 'https://eightyeightthirty.one/',
    text: 'Exploring 88x31 links as a graph'
  },
  {
    key: "trader-joe's",
    src: '/images/88x31/trader-joes.gif',
    text: 'somewhat obscure reference'
  },
  {
    key: 'no-ai',
    src: '/images/88x31/no-ai.png',
    href: 'https://dbushell.com/ai/',
    text: 'very much agree (therefore yoinked the button)'
  }
] satisfies Tile[]

const LinkTile = ({ src, href, text }: Tile) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="block">
    <img width={88} height={31} src={src} alt={text} className="text-sm" />
  </a>
)

const PlainTile = ({ src, text }: Tile) => (
  <div>
    <img width={88} height={31} src={src} alt={text} className="text-sm" />
  </div>
)

export const Buttons = () => (
  <div className="flex justify-center">
    <div className="flex w-full flex-wrap gap-2.5" style={{ imageRendering: 'pixelated' }}>
      {buttons.map(({ key, src, href, text }) => (
        <Tooltip arrow content={text} key={key} disableHoverableContent visible={!!text} className="lowercase">
          {href ? (
            <LinkTile src={src} text={text} href={href} key={key} />
          ) : (
            <PlainTile src={src} text={text} key={key} />
          )}
        </Tooltip>
      ))}
    </div>
  </div>
)
