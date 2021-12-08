import { writable, readable } from "svelte/store";
import { browser } from "$app/env";

export const dataUrl = writable(
  browser && (localStorage.getItem("dataUrl") || "http://localhost:3333")
);
dataUrl.subscribe((val) => {
  browser && localStorage.setItem("dataUrl", val);
});

export const memoryData = writable(
  browser && (localStorage.getItem("memoryData") || {})
);
memoryData.subscribe((val) => {
  browser && localStorage.setItem("memoryData", val);
});
