import moment from "jalali-moment";
import { yearMonths } from "./Date";

/**
 * Get current time
 * @returns {string}
 */
export const getCurrentTime = (): string => {
  return moment().format("HH:mm:ss");
};

/**
 * Get current jalali date by month name or number
 * @param {string} type
 */
export const getCurrentDate = (type: "monthByName" | "monthByNumber") => {
  if (type === "monthByNumber") {
    return moment().format("jYYYY/jMM/jDD");
  } else if (type === "monthByName") {
    const year = moment().format("jYYYY");
    const month = yearMonths[moment().jMonth()];
    const day = moment().format("jDD");
    return `${day} ${month} ${year}`;
  }
};

/**
 * Generate random number between two numbers (1 - 1000 defaults)
 * @returns {number}
 */
export const generateUniqueID = (min = 1, max = 1000): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
