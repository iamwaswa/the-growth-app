export function cmToInch(value: number, invert?: boolean) {
  const constant = 0.393701;
  return invert ? value / constant : value * constant;
}
