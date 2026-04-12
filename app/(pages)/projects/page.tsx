import { Heading1, Link } from '@/components/Basic'
import { Em, Strong } from '@/components/native-replacements'
import { Heart as HeartIcon } from 'pixelarticons/react'
import type { ReactNode } from 'react'

type LinkType = 'repo' | 'demo' | 'link' | 'pdf' | 'slides' | 'other'
type Project = {
  name: string
  links: Array<{ href: string; type: LinkType }>
  description: ReactNode
}

const projects = [
  {
    name: 'fahrplan',
    links: [{ type: 'repo', href: 'https://github.com/JaninaWibker/fahrplan' }],
    description: 'Quickly turn an iCAL calendar url into a web page displaying its events'
  },
  {
    name: 'parse-ical',
    links: [{ type: 'repo', href: 'https://github.com/JaninaWibker/parse-ical' }],
    description: 'Typescript first iCAL parsing library'
  },
  {
    name: 'spreadsheets',
    links: [{ type: 'repo', href: 'https://github.com/JaninaWibker/spreadsheets' }],
    description: 'small little spreadsheet program with formula support soon™ maybe (heh nope)'
  },
  {
    name: 'jdkbd',
    links: [{ type: 'repo', href: 'https://github.com/JaninaWibker/jdkbd' }],
    description: 'pcb design for my split 40% ortholinear keyboard (loosely based on the corne keyboard)'
  },
  {
    name: 'bachelor thesis',
    links: [
      { type: 'repo', href: 'https://github.com/JaninaWibker/bachelor-thesis' },
      { type: 'repo', href: 'https://github.com/JaninaWibker/pref-attestation-simulation' }
    ],
    description: (
      <>
        My bachelor thesis <Em>&quot;On the Feasibility of Attestation in PReF-Based Networks&quot;</Em> the topics of
        Physically Unclonable Functions (PUFs), Physically Related Functions (PReFs), Embedded Systems and Attestation
      </>
    )
  },
  {
    name: 'pnpm-licenses',
    links: [{ type: 'repo', href: 'https://github.com/Quantco/pnpm-licenses' }],
    description: 'Generate third party license disclaimers in pnpm-based projects'
  },
  {
    name: 'ui-actions',
    links: [{ type: 'repo', href: 'https://github.com/Quantco/ui-actions' }],
    description:
      'GitHub Action shenanigans. Tracks version number changes reliably (even with merges) for automatic releasing/publishing'
  },
  {
    name: 'kit-thesis',
    links: [{ type: 'repo', href: 'https://github.com/JaninaWibker/kit-thesis' }],
    description: 'typst thesis template for the KIT (Karlsruher Institut für Technologie)'
  },
  {
    name: 'dots',
    links: [{ type: 'repo', href: 'https://github.com/JaninaWibker/dots' }],
    description: (
      <>
        my personal dotfiles
        <HeartIcon viewBox="0 0 24 24" className="mb-0.5 ml-1 inline size-4 [&>*]:fill-current" />
        <br />
        janky handcrafted config files and other hacky things
      </>
    )
  },
  {
    name: 'school-docs',
    links: [
      { type: 'repo', href: 'https://github.com/JaninaWibker/school-docs' },
      { type: 'link', href: 'https://docs.janina.lol' }
    ],
    description:
      'Used to write and publish summaries and notes for subjects in school, continued with a few early university courses. Mostly in german'
  },
  {
    name: 'tm_vm',
    links: [{ type: 'repo', href: 'https://github.com/JaninaWibker/tm_vm' }],
    description: 'A virtual machine for turing machines which can output the current state as tex, svg, and gif'
  },
  {
    name: 'mimax-vm',
    links: [{ type: 'repo', href: 'https://github.com/JaninaWibker/mimax-vm' }],
    description:
      'A virtual machine, assembler & debugger for a minimalistic and educational instruction set architecture'
  },
  {
    name: 'auth',
    links: [{ type: 'repo', href: 'https://github.com/JaninaWibker/auth' }],
    description:
      'I wrote an identity provider and authentication service once. It is not good and only has limited functionality, but it was a fun exercise and learning experience'
  },
  {
    name: 'infra',
    links: [{ type: 'repo', href: 'https://github.com/JaninaWibker/infra' }],
    description: 'Ansible based infrastructure for my VPS'
  },
  {
    name: 'docs',
    links: [
      { type: 'repo', href: 'https://github.com/JaninaWibker/docs' },
      { type: 'demo', href: 'https://janinawibker-docs.vercel.app/' }
    ],
    description: '(unfinished) prototype of a component library for building documentation sites'
  },
  {
    name: 'alt-stdlib',
    links: [{ type: 'repo', href: 'https://github.com/JaninaWibker/alt-stdlib' }],
    description:
      'A few data structures and algorithmes implemented in C++, mostly based on learnings from my algorithms class'
  },
  {
    name: '6502-disassembler',
    links: [{ type: 'repo', href: 'https://github.com/JaninaWibker/6502-disassembler' }],
    description: 'A 6502 (NES) Disassembler written in Lua'
  },
  {
    name: 'proseminar-kaslr',
    links: [{ type: 'repo', href: 'https://github.com/JaninaWibker/proseminar-kaslr' }],
    description: 'A seminar talk and paper on KASLR (kernel address space layout randomization)'
  }
] satisfies Project[]

const ProjectPreview = ({ project }: { project: Project }) => (
  <div className="flex flex-col gap-2 border border-secondary-9 p-1">
    <div className="flex justify-between gap-2 border-b border-secondary-9">
      <Strong className="shrink-0">{project.name}</Strong>
      <div className="flex flex-wrap justify-end gap-1">
        {project.links.map(({ type, href }) => (
          <Link key={href} href={href}>
            {type}
          </Link>
        ))}
      </div>
    </div>
    <span>{project.description}</span>
  </div>
)

const Home = () => (
  <main className="lowercase">
    <Heading1 underlined>projects?</Heading1>
    GitHub: <Link href="https://github.com/JaninaWibker">JaninaWibker</Link>
    <br />
    <br />
    Some are sadly private or not online anymore (slimmed down my &quot;homelab&quot; considerably, which included
    getting rid of a personal git server), but here are some public ones projects:
    <div className="grid-lanes grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3 py-4">
      {projects.map((project) => (
        <ProjectPreview key={project.name} project={project} />
      ))}
    </div>
  </main>
)

export default Home
