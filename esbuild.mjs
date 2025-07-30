import esbuild from "esbuild"


await esbuild.build({
  entryPoints: ["./anki-highlight.ts"],
  outfile: "anki-highlight.user.js",
  bundle: true,
  banner: {js: `
// ==UserScript==
// @name         Anki Highlight
// @namespace    http://tampermonkey.net/
// @version      0.0.0
// @description  Highlights words on sites that are already in your anki deck
// @author       Luc Mcgrady
// @match        *://*/*
// @grant        none
// ==/UserScript==

const query = "deck:L::J";
const match_field = "Kanji";
const mature = 21;
`},
  minify: true
})