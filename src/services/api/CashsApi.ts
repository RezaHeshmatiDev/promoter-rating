import Axios from "../Axios";

/**
 *
 * @param {number} id Cash turn id
 * @returns {Promise}
 */
export const apiGetPromoters = (id: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    Axios.get(`/cashs/${id}`).then(resolve).catch(reject);
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
  invoiceId: number
): Promise<any> => {
  return new Promise((resolve, reject) => {
    Axios.get(`/cashs/invoice/${invoiceId}?promoterID=${promoterId}`)
      .then(resolve)
      .catch(reject);
  });
};
