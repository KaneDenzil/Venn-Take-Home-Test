import { scaleFont, scaleHeight } from './responsive';

export const typography = {
  h1: { fontSize: scaleFont(34), lineHeight: scaleHeight(40), fontWeight: "700" as const },
  label: { fontSize: scaleFont(16), lineHeight: scaleHeight(20), fontWeight: "600" as const },
  body: { fontSize: scaleFont(16), lineHeight: scaleHeight(22) },
  helper: { fontSize: scaleFont(13), lineHeight: scaleHeight(16) },
};
