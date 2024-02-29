export default function usePADDS(paddsData) {
  let PADDSPrices = [];

  if (typeof paddsData !== "undefined") {
    Object.keys(paddsData).forEach((key) => {
      const value = paddsData[key];
      const last = value.slice(-1);
      PADDSPrices[key] = last;
    });
  }

  return PADDSPrices;
}
