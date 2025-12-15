export function isColorSupported(): boolean {
  return process.stdout?.isTTY === true && process.env.NO_COLOR !== '1';
}