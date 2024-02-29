export default function useLineGraphData({ order, orig, list }) {
  let columns = ["asd"];
  let rows = [];

  const htmlTooltip = (key, data) => {
    let html =
      '<div style="padding: 10px; width: 180px;">' +
      `<b>${key}</b>` +
      `<p style="padding-bottom: 4px; margin: 0px;">${new Date(
        data?.period
      ).toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })}</p>` +
      `<p style="padding-bottom: 4px; margin: 0px;">${data?.value} dollars per gallon</p>` +
      "</div>";
    return html;
  };

  // Add tooltips
  // List = Selected Checkboxes
  if (typeof list !== "undefined") {
    list.map((loc) => {
      columns = [
        ...columns,
        loc,
        { type: "string", role: "tooltip", p: { html: true, role: "tooltip" } }
      ];
    });
  } else {
    Object.keys(order).map((loc) => {
      columns = [
        ...columns,
        loc,
        { type: "string", role: "tooltip", p: { html: true, role: "tooltip" } }
      ];
    });
  }

  let total = orig["U.S."].length;
  // Follow checkbox list
  // Remove unchecked
  if (typeof list !== "undefined") {
    for (let i = 0; i < total; i++) {
      let temp = [orig["U.S."][i]?.period];
      list.map((loc) => {
        let key = order[loc];
        temp = [...temp, parseFloat(orig[key][i]?.value)];
        temp = [...temp, htmlTooltip(loc, orig[key][i])];
      });

      rows = [...rows, temp];
    }
  } else {
    // Follow original list
    // Display all
    for (let i = 0; i < total; i++) {
      // Date column
      let temp = [orig["U.S."][i]?.period];
      Object.keys(order).map((loc) => {
        // Region Key
        let key = order[loc];
        // Date and price
        temp = [...temp, parseFloat(orig[key][i]?.value)];
        // Tooltip
        temp = [...temp, htmlTooltip(loc, orig[key][i])];
      });

      rows = [...rows, temp];
    }
  }

  return [columns, ...rows];
}
