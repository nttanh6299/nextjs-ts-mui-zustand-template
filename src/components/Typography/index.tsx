import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';
import { Breakpoint, styled, Theme } from '@mui/material/styles';
import {
  CSSProperties,
  Typography as TypoType,
  TypographyStyle,
} from '@mui/material/styles/createTypography';

export type Responsive<T> = T | Partial<Record<Breakpoint, T>>;

export type TypographyFontVariants = 'body' | 'heading';

export type FontSize =
  | 'tiny'
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '2.5xl'
  | '3xl'
  | '5xl'
  | '6xl';
type FontWeight =
  | 'fontWeightBase'
  | 'fontWeightMedium'
  | 'fontWeightSemiBold'
  | 'fontWeightBold'
  | 'fontWeightExtraBold'
  | 'fontWeightBlack';

export type TypographyBase = {
  size?: Responsive<FontSize>;
  fontWeight?: Responsive<FontWeight>;
  fontVariant?: TypographyFontVariants;
  as?: React.ElementType;
};

export type TypographyProps = MuiTypographyProps & TypographyBase;

function manipulate<T>(
  theme: Theme,
  style?: Responsive<T>,
  defaultStyle?: string | number | TypographyStyle,
  propertyKey?: keyof CSSProperties,
) {
  if (!style || typeof style === 'string' || typeof style === 'number') {
    const value = theme.typography[style as unknown as keyof TypoType] || defaultStyle;
    return propertyKey ? { [propertyKey]: value } : value;
  }

  const entries = Object.entries(style);

  const breakpointStyles = entries.reduce((acc, [key, value]) => {
    const styles = theme.typography[value as keyof TypoType];
    return key === 'xs' // no need to add responsive in smallest breakpoint
      ? {
          ...acc,
          ...(styles as object),
        }
      : {
          ...acc,
          [theme.breakpoints.up(key as Breakpoint)]: styles,
        };
  }, {});

  return breakpointStyles;
}

const MTypography = styled(MuiTypography, {
  shouldForwardProp: (prop) =>
    !['color', 'fontWeight', 'fontVariant', 'size', 'fontSize'].includes(prop as string),
})<TypographyBase>(({ theme, fontVariant, size, fontWeight }) => ({
  ...manipulate<FontSize>(theme, size, theme.typography.base),
  ...manipulate<FontWeight>(theme, fontWeight, theme.typography.fontWeightMedium, 'fontWeight'),
  fontFamily:
    !fontVariant || fontVariant === 'body'
      ? theme.typography.fontFamily
      : theme.typography.headingFontFamily,
}));

const Typography = ({
  children,
  size,
  fontSize,
  fontVariant,
  fontWeight,
  color,
  ...props
}: TypographyProps) => (
  <MTypography
    {...props}
    fontSize={fontSize}
    size={size || 'base'}
    fontVariant={fontVariant}
    fontWeight={fontWeight}
    color={color || 'dark.main'}
  >
    {children}
  </MTypography>
);

export default Typography;
