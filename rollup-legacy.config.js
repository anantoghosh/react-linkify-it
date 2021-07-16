import ts from "rollup-plugin-ts";
import { terser } from "rollup-plugin-terser";
import size from "rollup-plugin-size";

export default {
  input: "src/index.tsx",
  output: [
    { file: "dist/react-linkit.legacy.esm.min.js", format: "esm" },
    {
      file: "dist/react-linkit.legacy.umd.min.js",
      format: "umd",
      name: "react-linkit",
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
