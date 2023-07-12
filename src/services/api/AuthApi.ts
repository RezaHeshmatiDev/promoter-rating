import Axios from "../Axios";

/**
 * @returns {Promise}
 */
export const apiPostLogin = (
  username: string,
  password: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();

    formData.append("userName", username);
    formData.append("password", password);

    Axios.post("/auth/login", formData).then(resolve).catch(reject);
  });
};

/**
 *
 * @param {string} access_token
 * @returns {Promise}
 */
export const apiGetProfile = (access_token?: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    Axios.get("/auth/profile", {
      headers: { Authorization: `Bearer ${access_token}` },
    })
      .then(resolve)
      .catch(reject);
  });
};

export const apiPostSignup = (
  username: string,
  password: string,
  fullname: string,
  role: string,
  cash: string
) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();

    formData.append("userName", username);
    formData.append("password", password);
    formData.append("fullName", fullname);
    formData.append("role", role);
    formData.append("cashID", cash);

    Axios.post("/auth/signup", formData).then(resolve).catch(reject);
  });
};

export const apiPatchUser = (
  userId: number,
  username: string,
  password: string,
  fullname: string,
  role: string,
  cash: string
) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();

    formData.append("userName", username);
    formData.append("password", password);
    formData.append("fullName", fullname);
    formData.append("role", role);
    formData.append("cashID", cash);

    Axios.post(`/user/${userId}`, formData).then(resolve).catch(reject);
  });
};

/**
 *
 * @param {number} id
 * @returns {Promise}
 */
export const apiDeleteUser = (id: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    Axios.delete(`/user/${id}`).then(resolve).catch(reject);
  });
};
