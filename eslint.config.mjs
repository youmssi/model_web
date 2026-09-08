import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored React Bits components (copied verbatim from the reactbits.dev
    // registry). They follow their own lint conventions.
    "components/AeroShards.tsx",
    "components/Antigravity.tsx",
    "components/ASCIIText.tsx",
    "components/CurvedInput.tsx",
    "components/DecayCard.tsx",
    "components/DriftWall.tsx",
    "components/FallingText.tsx",
    "components/FuzzyText.tsx",
    "components/GooeyNav.tsx",
    "components/InfiniteSpiral.tsx",
    "components/MagicBento.tsx",
    "components/MagnetLines.tsx",
    "components/Masonry.tsx",
    "components/Noise.tsx",
    "components/PixelCard.tsx",
    "components/TargetCursor.tsx",
    "components/TiltedCard.tsx",
  ]),
]);

export default eslintConfig;
