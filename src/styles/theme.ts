import { PaletteMode } from '@mui/material';
import { TypographyStyle, createTheme as createMuiTheme } from '@mui/material/styles';
import { Encode_Sans as EncodeSans } from 'next/font/google';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    iPad: true;
    xxl: true;
    '3xl': true;
  }

  interface TypographyVariants {
    fontWeightBase: number;
    fontWeightSemiBold: number;
    fontWeightExtraBold: number;
    fontWeightBlack: number;
    tiny: TypographyStyle;
    xs: TypographyStyle;
    sm: TypographyStyle;
    base: TypographyStyle;
    lg: TypographyStyle;
    xl: TypographyStyle;
    '2xl': TypographyStyle;
    '2.5xl': TypographyStyle;
    '3xl': TypographyStyle;
    '4xl': TypographyStyle;
    '5xl': TypographyStyle;
    '6xl': TypographyStyle;
  }

  interface TypographyVariantsOptions {
    fontWeightBase: number;
    fontWeightSemiBold: number;
    fontWeightExtraBold: number;
    fontWeightBlack: number;
    tiny: TypographyStyle;
    xs: TypographyStyle;
    sm: TypographyStyle;
    base: TypographyStyle;
    lg: TypographyStyle;
    xl: TypographyStyle;
    '2xl': TypographyStyle;
    '2.5xl': TypographyStyle;
    '3xl': TypographyStyle;
    '5xl': TypographyStyle;
    '6xl': TypographyStyle;
  }
}

const HTML_FONT_SIZE = 16;
export const pxToRem = (px: number) => `${px / HTML_FONT_SIZE}rem`;

export const createTypoStyle = (fontSize: number, lineHeight: number) => ({
  fontSize: pxToRem(fontSize),
  lineHeight: pxToRem(lineHeight),
});

export const encodeSansLight = EncodeSans({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

export const createTheme = (mode: string) =>
  createMuiTheme({
    palette: {
      mode: mode as PaletteMode,
    },
    typography: {
      htmlFontSize: HTML_FONT_SIZE,
      fontFamily: [encodeSansLight.style.fontFamily, 'sans-serif'].join(','),
      fontWeightBase: 400,
      fontWeightSemiBold: 600,
      fontWeightExtraBold: 800,
      fontWeightBlack: 900,
      tiny: createTypoStyle(8, 12),
      xs: createTypoStyle(10, 16),
      sm: createTypoStyle(12, 20),
      base: createTypoStyle(14, 22),
      lg: createTypoStyle(16, 24),
      xl: createTypoStyle(18, 28),
      '2xl': createTypoStyle(24, 32),
      '2.5xl': createTypoStyle(32, 40),
      '3xl': createTypoStyle(36, 44),
      '5xl': createTypoStyle(54, 70),
      '6xl': createTypoStyle(64, 72),
    },
  });
