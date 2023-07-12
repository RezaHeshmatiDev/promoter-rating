import { LocalUser } from "./Interfaces";

// TODO:we may need to change storage according to needs of the project!
export const getUser = (): LocalUser | null =>
  JSON.parse(sessionStorage.getItem("userData") || "null");

export const setUser = (userData: LocalUser) =>
  sessionStorage.setItem("userData", JSON.stringify(userData));

export const removeUser = () => sessionStorage.removeItem("userData");
