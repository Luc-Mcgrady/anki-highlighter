import * as d3 from "d3";
import { writable } from "svelte/store";

export const low_colour = "red";
export const mature_colour = "green";
export const new_colour = "steelblue";

export const gradient = d3.scaleLinear([0, 21], [d3.color(low_colour), d3.color(mature_colour)]);

export const selected = writable<any>(null);

export const searched_field = writable("Front");
