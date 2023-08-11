import ts from "rollup-plugin-ts";
import size from "rollup-plugin-size";

export default {
  input: "src/index.tsx",
  output: [
    { file: "dist/react-linkify-it.esm.js", format: "esm", plugins: [size()] },
  ],
  plugins: [
    ts({
      transpiler: {
        typescriptSyntax: "typescript",
        otherSyntax: "babel",
      },
      browserslist: { path: ".browserslistrc" },
      exclude: ["*.test.*"],
    }),
  ],
  external: ["react"],
};
