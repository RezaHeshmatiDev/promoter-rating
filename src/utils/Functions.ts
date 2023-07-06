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

/**
 * Convert all digits in a string to english
 * @param {string} num
 * @returns {string}
 */
export const convertToEnglishDigit = (num: string): string => {
  return num
    .replace(/[\u0660-\u0669]/g, (c) => (c.charCodeAt(0) - 0x0660).toString())
    .replace(/[\u06f0-\u06f9]/g, (c) => (c.charCodeAt(0) - 0x06f0).toString());
};

/**
 *
 * @param {string} str
 * @returns {string}
 */
export const removeWhiteSpaceFromString = (str: string): string => {
  return str && str.split(/\s+/).join("");
};
