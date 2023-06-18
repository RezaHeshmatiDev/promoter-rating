//TODO:we may need to change storage according to needs of the project!
export const getToken: () => string | null = () =>
  sessionStorage.getItem("token");

export const setToken: (token: string) => void = (token) =>
  sessionStorage.setItem("token", token);

export const removeToken: () => void = () => sessionStorage.removeItem("token");
