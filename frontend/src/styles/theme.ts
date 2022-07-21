import { css, CSSProp } from 'styled-components'

type BackQuoteArgs = string[]

const sizes: { [key: string]: number } = {
  desktop: 1024,
  mobile: 768,
}

interface Media {
  desktop: (...args: BackQuoteArgs) => CSSProp | undefined
  mobile: (...args: BackQuoteArgs) => CSSProp | undefined
}

const media: Media = {
  desktop: () => undefined,
  mobile: () => undefined,
}

const makeMedia = (args: BackQuoteArgs, label: string) => {
  return css`
    @media (max-width: ${sizes[label]}px) {
      ${args}
    }
  `
}

Object.keys(sizes).reduce((acc: Media, label: string) => {
  if (label === 'desktop' || label === 'mobile') {
    acc[label] = (...args: BackQuoteArgs) => makeMedia(args, label)
  }

  return acc
}, media)

const color = {
  black: '#000000',
  white: '#ffffff',
  color1: '#222831',
  color2: '#393E46',
  color3: '#00ADB5',
  color4: '#EEEEEE',
}

export type Color = typeof color

const theme = {
  color,
  media,
}

export default theme
