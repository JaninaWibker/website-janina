import type { JSX, DetailedHTMLProps, SVGProps } from 'react'

export type Empty = Record<string, never>

export type NativeProps<
  NativeElement extends keyof JSX.IntrinsicElements,
  OmittedKeys extends string | number | symbol | undefined = undefined
> = Omit<JSX.IntrinsicElements[NativeElement], OmittedKeys extends undefined ? 'ref' : 'ref' | OmittedKeys>

export type NativeElement<Name extends keyof JSX.IntrinsicElements> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  JSX.IntrinsicElements[Name] extends DetailedHTMLProps<any, infer T>
    ? T
    : JSX.IntrinsicElements[Name] extends SVGProps<infer T>
      ? T
      : never
