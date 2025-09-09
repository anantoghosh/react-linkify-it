
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import size from "rollup-plugin-size";

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
      presets: [
        [
          "@babel/preset-env",
          {
            useBuiltIns: "usage",
            corejs: 3,
            // Uses default .browserslistrc
          },
        ],
        "@babel/preset-typescript",
      ],
    }),
  ],
  external: ["react"],
};
