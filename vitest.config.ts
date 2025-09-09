import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.tsx"],
    sequence: {
      concurrent: false,
    },
    coverage: {
      exclude: [
        "gpr-hack.js",
        "rollup-legacy.config.js",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
