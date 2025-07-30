import esbuild from "esbuild"


await esbuild.build({
  entryPoints: ["./anki-highlight.ts"],
  outfile: "anki-highlight.user.js",
  bundle: true,
})