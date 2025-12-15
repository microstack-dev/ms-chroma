export function strip(input: string): string {
  return input.replace(/\x1b\[[0-9;]*m/g, '');
}