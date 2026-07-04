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

/** All known tool identifiers */
export type ToolId =
  | 'compressor'
  | 'converter'
  | 'resizer'
  | 'cropper'
  | 'background-remover'
  | 'watermark-remover'
  | 'heic-converter'
  | 'metadata'
  | 'blur'
  | 'rotator'
  | 'flipper'
  | 'format-viewer'
  | 'signature'
  | 'image-to-pdf';

/** High-level grouping for navigation / marketing */
export type ToolCategory = 'convert' | 'transform' | 'enhance' | 'analyze' | 'create';

/** Where a tool is in its lifecycle */
export type ToolStatus = 'live' | 'beta' | 'coming-soon' | 'planned';

/** Workflow step a tool can participate in */
export type ToolWorkflowStep = 'upload' | 'configure' | 'process' | 'results';

export interface ToolConfig {
  id: ToolId;
  name: string;
  shortName?: string;
  description: string;
  longDescription?: string;
  icon: string;
  path: string;
  category: ToolCategory;
  status: ToolStatus;
  /** Accepted MIME / extension groups (e.g. ['image/*', 'application/pdf']) */
  inputFormats?: string[];
  /** Output format labels shown in the UI (e.g. ['JPEG','PNG','WebP']) */
  outputFormats?: string[];
  /** Maximum number of files the tool accepts at once */
  maxInputs?: number;
  /** Per-file size limit in bytes */
  maxFileSize?: number;
  /** Workflow steps this tool requires */
  steps?: ToolWorkflowStep[];
  /** If true, requires Wasm or an AI model not yet bundled client-side */
  requiresWasm?: boolean;
}
