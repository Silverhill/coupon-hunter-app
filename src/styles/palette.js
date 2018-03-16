import chroma from 'chroma-js';

export const colors = {
  orange: chroma('#E67543'),
  watermelon: chroma('#ff4a67'),
  green: chroma('#767B3A'),
  dark: chroma('#4A4B21'),
  white: chroma('white'),
  black: chroma('black'),
  lightGray: chroma('#e4e4e4'),
  gray: chroma('#b7b7b3'),
  sunshineYellow: chroma('#fffd35'),
  strongPink: chroma('ff007c')
};

const palette = {
  primary: colors.green,
  secondary: colors.gray,
  accent: colors.watermelon,

  text: colors.dark,
  invertedText: colors.white.alpha(0.9).css(),
  secondaryText: colors.dark,

  dark: colors.dark,
  neutral: colors.gray,
  white: colors.white,
  neutralLight: colors.lightGray,

  error: colors.orange,
  gradientOne: colors.sunshineYellow,
  gradientTwo: colors.strongPink,
};

export default palette;
