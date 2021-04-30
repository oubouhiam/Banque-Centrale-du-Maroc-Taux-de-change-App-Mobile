import { format } from "date-fns";

// We have a set of sample rates
const SAMPLE_RATES = {
  fetch(`https://api.exchangeratesapi.io/v1/latest
    ? access_key = 774246bf225880ef504b4963c5fd2903`)
  
};

export const api = (fullPath = "") => {
  const [path] = fullPath.split("?");

  if (path.length === 0) {
    return Promise.reject(new Error("Path is required."));
  }

  if (path !== "/latest") {
    return Promise.reject(new Error("Invalid path."));
  }

  const baseCurrency = fullPath.split("base=")[1] || "EUR";

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        base: baseCurrency,
        date: format(new Date(), "yyyy-MM-dd"),
        rates: {
          ...SAMPLE_RATES,
          [baseCurrency]: 1
        }
      });
    }, 500);
  });
};
