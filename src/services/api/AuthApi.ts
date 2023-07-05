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
