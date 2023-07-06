import { RequestedFilter } from "../../pages/Table/Table";
import Axios from "../Axios";

/**
 *
 * @returns {Promise}
 */
export const apiGetAllPromoters = (
  filter?: RequestedFilter,
  sort?: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const params = {};

    if (sort) Object.assign(params, { sort });
    if (filter) Object.assign(params, { ...filter });

    Axios.get(`/promoters`, { params }).then(resolve).catch(reject);
  });
};

/**
 * @param {number} id
 * @returns {Promise}
 */
export const apiGetPromoterDetails = (
  id: number,
  filter?: RequestedFilter,
  sort?: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const params = {};

    if (sort) Object.assign(params, { sort });
    if (filter) Object.assign(params, { ...filter });

    Axios.get(`/promoters/${id}`, { params }).then(resolve).catch(reject);
  });
};

/**
 *
 * @param {number} promoterId
 * @param {number} score
 * @param {number} invoiceId
 * @returns {Promise}
 */
export const apiRatePromoters = (
  promoterId: number,
  invoiceId: number,
  score: number
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();

    formData.append("ratingScore", score.toString());
    formData.append("invoiceID", invoiceId.toString());

    Axios.patch(`/promoters/${promoterId}/rate`, formData)
      .then(resolve)
      .catch(reject);
  });
};

/**
 *
 * @param {number} promoterId
 * @param {number} invoiceId
 * @param {string} notes
 * @returns {Promise}
 */
export const apiPatchPromoters = (
  promoterId: number,
  invoiceId: number,
  notes: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();

    formData.append("notes", notes);
    formData.append("invoiceID", invoiceId.toString());

    Axios.patch(`/promoters/${promoterId}`, formData)
      .then(resolve)
      .catch(reject);
  });
};
