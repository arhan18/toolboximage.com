export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  onPrimary: string;
  ink: string;
  body: string;
  mute: string;
  hairline: string;
  hairlineStrong: string;
  canvas: string;
  canvasSoft: string;
  canvasSoft2: string;
  link: string;
  linkDeep: string;
  linkBgSoft: string;
  success: string;
  error: string;
  errorSoft: string;
  errorDeep: string;
  warning: string;
  warningSoft: string;
  warningDeep: string;
  violet: string;
  violetSoft: string;
  violetDeep: string;
  cyan: string;
  cyanSoft: string;
  cyanDeep: string;
  highlightPink: string;
  highlightMagenta: string;
  gradientDevelopStart: string;
  gradientDevelopEnd: string;
  gradientPreviewStart: string;
  gradientPreviewEnd: string;
  gradientShipStart: string;
  gradientShipEnd: string;
  selectionBg: string;
  selectionFg: string;
}

export interface TypographyToken {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  letterSpacing?: string;
}

export interface TypographyScale {
  displayXl: TypographyToken;
  displayLg: TypographyToken;
  displayMd: TypographyToken;
  displaySm: TypographyToken;
  bodyLg: TypographyToken;
  bodyMd: TypographyToken;
  bodyMdStrong: TypographyToken;
  bodySm: TypographyToken;
  bodySmStrong: TypographyToken;
  caption: TypographyToken;
  captionMono: TypographyToken;
  code: TypographyToken;
  buttonMd: TypographyToken;
  buttonLg: TypographyToken;
}

export interface SpacingScale {
  xxs: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
  section: string;
}

export interface RoundedScale {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  pillSm: string;
  pill: string;
  full: string;
}

export type ToolId = 'compressor' | 'resizer' | 'converter' | 'cropper' | 'watermark';

export interface ToolConfig {
  id: ToolId;
  name: string;
  description: string;
  icon: string;
  path: string;
  available: boolean;
}
