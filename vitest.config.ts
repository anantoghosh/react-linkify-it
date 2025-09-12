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
        "*.js",
        "*.ts",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
