import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import size from "rollup-plugin-size";

export default {
  input: "src/index.tsx",
  output: [
    { file: "dist/react-linkify-it.legacy.esm.min.js", format: "esm" },
    {
      file: "dist/react-linkify-it.legacy.umd.min.js",
      format: "umd",
      name: "react-linkify-it",
      globals: {
        react: "React",
      },
    },
  ],
  plugins: [
    size(),
    terser(),
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
            targets: {
              ie: "11",
            },
          },
        ],
        "@babel/preset-typescript",
      ],
    }),
  ],
  external: ["react"],
};
