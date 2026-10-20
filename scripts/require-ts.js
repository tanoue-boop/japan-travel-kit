/**
 * Lets the plain-Node build scripts in this folder `require()` the TypeScript
 * data modules in lib/ (guide-hub.ts, guides-*.ts, attraction-prices.ts).
 *
 * Added 2026-10-20 for scripts/generate-llms-txt.js. Those modules are the single
 * source of truth for every article's URL, title and description, so llms.txt has
 * to read them rather than keep a second copy of the same list. They are plain
 * data and functions with no JSX, so transpiling each file on the fly with the
 * TypeScript compiler (already a devDependency, and required for `next build`
 * anyway) is enough — no ts-node, no extra install.
 *
 * Type-checking is `next build`'s job; this only strips the types.
 */
const fs = require("fs");
const ts = require("typescript");

if (!require.extensions[".ts"]) {
  require.extensions[".ts"] = (module, filename) => {
    const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        esModuleInterop: true,
      },
      fileName: filename,
    });
    module._compile(outputText, filename);
  };
}
