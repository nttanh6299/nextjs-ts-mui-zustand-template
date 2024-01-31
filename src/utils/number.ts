export function getRandomInt(min: number, max: number) {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
}

export function numberWithDot(x: number, zeroPrefix?: boolean) {
  if (zeroPrefix && x >= 0 && x < 10) {
    return `0${x}`;
  }
  return x ? x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.') : `${x}`;
}
