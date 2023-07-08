import { Filter, Sort } from "../../components/Table/Table";
import Axios from "../Axios";

/**
 *
 * @returns {Promise}
 */
export const apiGetCashs = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    Axios.get(`/cashs`).then(resolve).catch(reject);
  });
};

/**
 *
 * @param {number} cashId
 * @param {number} invoiceId
 * @returns {Promise}
 */
export const apiGetPromoters = (
  cashId: number,
  invoiceId: number
): Promise<any> => {
  return new Promise((resolve, reject) => {
    Axios.get(`/cashs/${cashId}/invoice/${invoiceId}`)
      .then(resolve)
      .catch(reject);
  });
};

/**
 *
 * @param {number} promoterId promoter id
 * @param {number} invoiceId invoice id
 * @returns {Promise}
 */
export const apiGetInvoices = (
  promoterId: number,
  invoiceId: number,
  filter?: Filter,
  sort?: Sort
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const params = {};

    if (sort) Object.assign(params, { ...sort });
    if (filter) Object.assign(params, { ...filter });

    Axios.get(`/cashs/invoice/${invoiceId}?promoterID=${promoterId}`, {
      params,
    })
      .then(resolve)
      .catch(reject);
  });
};
