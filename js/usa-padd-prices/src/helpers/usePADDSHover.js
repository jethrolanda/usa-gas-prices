export default function usePADDSHover(state, stateName, PADDSPrices) {
  let tooltipSpan = document.getElementById("tooltip-wrapper");
  let padd = "";
  let region = "";
  let price = "";
  let date = "";
  let padd1a = "";
  let padd1b = "";
  let padd1c = "";
  if (
    ["WA", "OR", "CA", "AK", "HI", "NV", "AZ", "NM"].find(
      (element) => element === state
    )
  ) {
    padd = "PADD 5";
    region = "West Coast, AK, HI";
  } else if (
    ["MT", "ID", "WY", "UT", "CO"].find((element) => element === state)
  ) {
    padd = "PADD 4";
    region = "Rocky Mountain";
  } else if (
    ["TX", "LA", "MS", "AR", "AL"].find((element) => element === state)
  ) {
    padd = "PADD 3";
    region = "Gulf Coast";
  } else if (
    ["FL", "GA", "SC", "NC", "VA", "WV"].find((element) => element === state) ||
    ["MD", "DE", "PA", "NY", "NJ"].find((element) => element === state) ||
    ["CT", "ME", "NH", "VT", "MA", "RI", "CT"].find(
      (element) => element === state
    )
  ) {
    padd = "PADD 1";
    region = "East Coast";
  } else if (
    [
      "ND",
      "SD",
      "NE",
      "KS",
      "OK",
      "MN",
      "IA",
      "MO",
      "TN",
      "KY",
      "IL",
      "IN",
      "OH",
      "WI",
      "MI"
    ].find((element) => element === state)
  ) {
    padd = "PADD 2";
    region = "Midwest";
  }

  if (padd !== null && PADDSPrices?.[padd]?.length > 0) {
    let value = parseFloat(PADDSPrices[padd][0]?.value).toFixed(2);
    price = `$${value}`;
    date = `AS OF ${PADDSPrices[padd][0]?.period}`;
    let classPadds = padd.replace(/\s/g, "");
  }

  // IF PADD 1 THEN INCLUDE PADD 1A, PADD 1B, PADD 1C
  if (padd === "PADD 1" && PADDSPrices?.["PADD 1A"]?.length > 0) {
    let value = parseFloat(PADDSPrices["PADD 1A"][0]?.value).toFixed(2);
    let price2 = `$${value}`;
    padd1a = `PADD 1A <span style="font-weight: 300">${price2}</span>`;
  }

  if (padd === "PADD 1" && PADDSPrices?.["PADD 1B"]?.length > 0) {
    let value = parseFloat(PADDSPrices["PADD 1B"][0]?.value).toFixed(2);
    let price2 = `$${value}`;
    padd1b = `PADD 1B <span style="font-weight: 300">${price2}</span>`;
  }

  if (padd === "PADD 1" && PADDSPrices?.["PADD 1C"]?.length > 0) {
    let value = parseFloat(PADDSPrices["PADD 1C"][0]?.value).toFixed(2);
    let price2 = `$${value}`;
    padd1c = `PADD 1C <span style="font-weight: 300">${price2}</span>`;
  }

  tooltipSpan.querySelector(".region").innerHTML = padd;
  tooltipSpan.querySelector(".state").innerHTML = region;
  tooltipSpan.querySelector(".price").innerHTML = price;
  tooltipSpan.querySelector(".date").innerHTML = date;
  tooltipSpan.querySelector(".padd1a").innerHTML = padd1a;
  tooltipSpan.querySelector(".padd1b").innerHTML = padd1b;
  tooltipSpan.querySelector(".padd1c").innerHTML = padd1c;
}
