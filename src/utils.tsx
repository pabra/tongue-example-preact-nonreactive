import { Languages } from './translate';

const uniLet = {
  b: '\u{1F1E7}',
  d: '\u{1F1E9}',
  e: '\u{1F1EA}',
  f: '\u{1F1EB}',
  g: '\u{1F1EC}',
  r: '\u{1F1F7}',
  s: '\u{1F1F8}',
} as const;

export const flags: Record<Languages, string> = {
  en: uniLet.g + uniLet.b,
  de: uniLet.d + uniLet.e,
  es: uniLet.e + uniLet.s,
  fr: uniLet.f + uniLet.r,
} as const;

export const isInArray = <T,>(arr: Readonly<T[]>, item: T | any): item is T =>
  arr.indexOf(item) !== -1;
