export function kgToLb(value: number, invert?: boolean) {
  const constant = 2.20462;
  return invert ? value / constant : value * constant;
}
