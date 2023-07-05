import Axios from "../Axios";

/**
 *
 * @returns {Promise}
 */
export const apiGetAllPromoters = (sort?: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const params = {};

    if (sort) {
      Object.assign(params, { sort });
    }

    Axios.get(`/promoters`, { params }).then(resolve).catch(reject);
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