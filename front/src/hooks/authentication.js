import parseJWT from "utils/parseJWT";

import { getLocal, useLocalStorage } from "./localStorage";

export const authenticated = (jwt = getLocal("jwt")) =>
  jwt && parseJWT(jwt).exp * 1000 > Date.now();

// ignore if invalid
export const localJWT = (jwt = getLocal("jwt")) =>
  authenticated(jwt) && jwt;

export const useJWT = () =>
  useLocalStorage("jwt", { invalidateIf: (jwt) => !authenticated });
