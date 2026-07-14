/// <reference lib="webworker" />

import { Serwist } from "serwist";

export {};

const serwist = new Serwist({
  precacheEntries: self.__RSC_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
});

serwist.addEventListeners();
