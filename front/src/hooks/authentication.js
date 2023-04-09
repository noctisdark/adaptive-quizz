import { getLocalJSON, useLocalStorage } from "./localStorage";

export const useSession = () => useLocalStorage("session");

export const authenticated = (session = getLocalJSON("session")) =>
  session && session.expires_at < Date.now();

export const localJWT = (session = getLocalJSON("session")) =>
  authenticated(session) && session.jwt;
