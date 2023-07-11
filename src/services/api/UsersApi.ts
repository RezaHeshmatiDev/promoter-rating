import Axios from "../Axios";

/**
 * @returns {Promise}
 */
export const apiGetUsers = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    Axios.get("/user").then(resolve).catch(reject);
  });
};
