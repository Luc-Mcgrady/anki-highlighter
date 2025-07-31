import Rainbow from "rainbowvis.js";
import { writable } from "svelte/store";

export const low_colour = "red";
export const mature_colour = "green";
export const new_colour = "blue";

export const gradient = new Rainbow();

gradient.setNumberRange(0, 21);
gradient.setSpectrum(low_colour, mature_colour);

export const selected = writable<any>(null);
