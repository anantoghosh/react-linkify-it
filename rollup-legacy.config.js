import ts from "rollup-plugin-ts";
import { terser } from "rollup-plugin-terser";
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
    ts({
      transpiler: {
        typescriptSyntax: "typescript",
        otherSyntax: "babel",
      },
      browserslist: { path: ".browserslistrc-legacy" },
      exclude: ["*.test.*"],
    }),
  ],
  external: ["react"],
};
