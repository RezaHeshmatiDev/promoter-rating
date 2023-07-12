import Axios from "../Axios";

/**
 *
 * @returns {Promise}
 */
export const apiGetDashboardPromoters = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    Axios.get(`/dashboard/promoter`).then(resolve).catch(reject);
  });
};

/**
 *
 * @returns {Promise}
 */
export const apiGetDashboardInvoices = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    Axios.get(`/dashboard/invoice`).then(resolve).catch(reject);
  });
};
