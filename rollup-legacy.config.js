import ts from "rollup-plugin-ts";
import { terser } from "rollup-plugin-terser";
import size from "rollup-plugin-size";

export default {
  input: "src/index.tsx",
  output: [
    { file: "dist/react-link-text.legacy.esm.min.js", format: "esm" },
    {
      file: "dist/react-link-text.legacy.umd.min.js",
      format: "umd",
      name: "react-link-text",
      globals: {
        react: "React",
      },
    },
  ],
  plugins: [
    size(),
    terser(),
    ts({
      transpiler: "babel",
      browserslist: { path: ".browserslistrc-legacy" },
      exclude: ["*.test.*"],
    }),
  ],
  external: ["react"],
};
