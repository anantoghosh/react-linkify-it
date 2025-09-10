import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import size from "rollup-plugin-size";
import { codecovRollupPlugin } from "@codecov/rollup-plugin";
import process from "node:process";

export default {
  input: "src/index.tsx",
  output: [
    { file: "dist/react-linkify-it.esm.js", format: "esm", plugins: [size()] },
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      exclude: ["*.test.*"],
    }),
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      exclude: "node_modules/**",
      presets: ["@babel/preset-env", "@babel/preset-typescript"],
    }),
    codecovRollupPlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: "react-linkify-it",
      uploadToken: process.env.CODECOV_TOKEN,
      telemetry: false,
    }),
  ],
  external: ["react"],
};
