import ts from "rollup-plugin-ts";
import size from "rollup-plugin-size";

export default {
  input: "src/index.tsx",
  output: [
    { file: "dist/react-linkit.esm.js", format: "esm", plugins: [size()] },
  ],
  plugins: [
    ts({
      transpiler: "babel",
      browserslist: { path: ".browserslistrc" },
      babelConfig: {
        plugins: ["@babel/plugin-proposal-nullish-coalescing-operator"],
      },
      exclude: ["*.test.*"],
    }),
  ],
  external: ["react"],
};
