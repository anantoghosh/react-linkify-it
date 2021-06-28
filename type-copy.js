import { copyFileSync } from "fs";

const file = copyFileSync("./index.d.ts", "./legacy/index.d.ts");
