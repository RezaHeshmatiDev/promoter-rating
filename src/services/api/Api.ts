import Axios from "../Axios";

/**
 * @returns {Promise}
 */
export const apiGetCacheTurns = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    Axios.get("/cash-turns").then(resolve).catch(reject);
  });
};

/**
 *
 * @param {number} id Cash turn id
 * @returns {Promise}
 */
export const apiGetPromoters = (id: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    Axios.get(`/cash-turns/${id}`).then(resolve).catch(reject);
  });
};

/**
 *
 * @returns {Promise}
 */
export const apiGetAllPromoters = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    Axios.get(`/promoters`).then(resolve).catch(reject);
  });
};

/**
 * @param {number} id
 * @returns {Promise}
 */
export const apiGetPromoterDetails = (id: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    Axios.get(`/promoters/${id}`).then(resolve).catch(reject);
  });
};

/**
 *
 * @param {number} promoterId
 * @param {number} score
 * @param {number} invoiceId
 * @returns {Promise}
 */
export const apiPatchPromoters = (
  promoterId: number,
  invoiceId: number,
  score: number
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();

    formData.append("ratingScore", score.toString());
    formData.append("invoiceID", invoiceId.toString());

    Axios.patch(`/promoters/${promoterId}`, formData)
      .then(resolve)
      .catch(reject);
  });
};
