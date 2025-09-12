import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["./src/index.tsx"],
    platform: "neutral",
    dts: true,
    format: ["esm", "cjs"],
    clean: true,
    external: ["react", "react/jsx-runtime"],
    name: "react-linkify-it",
    publint: true,
    exports: true,
  },
]);
