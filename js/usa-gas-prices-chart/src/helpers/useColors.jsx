export default function useColors(order, defaultColors) {
  let colors = [];

  order.map((item) => {
    colors = [...colors, { color: defaultColors[item] }];
  });

  return colors;
}
