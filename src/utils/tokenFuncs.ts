import { User } from "./Interfaces";

// TODO:we may need to change storage according to needs of the project!
export const getUser = (): User | null =>
  JSON.parse(sessionStorage.getItem("userData") || "null");

export const setUser = (userData: User) =>
  sessionStorage.setItem("userData", JSON.stringify(userData));

export const removeUser = () => sessionStorage.removeItem("userData");
