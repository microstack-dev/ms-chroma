export interface Style {
  open: string;
  close: string;
}

const esc = '\x1b[';
const m = 'm';

export const styles: Record<string, Style> = {
  black: { open: `${esc}30${m}`, close: `${esc}39${m}` },
  red: { open: `${esc}31${m}`, close: `${esc}39${m}` },
  green: { open: `${esc}32${m}`, close: `${esc}39${m}` },
  yellow: { open: `${esc}33${m}`, close: `${esc}39${m}` },
  blue: { open: `${esc}34${m}`, close: `${esc}39${m}` },
  magenta: { open: `${esc}35${m}`, close: `${esc}39${m}` },
  cyan: { open: `${esc}36${m}`, close: `${esc}39${m}` },
  white: { open: `${esc}37${m}`, close: `${esc}39${m}` },
  bold: { open: `${esc}1${m}`, close: `${esc}22${m}` },
  dim: { open: `${esc}2${m}`, close: `${esc}22${m}` },
  underline: { open: `${esc}4${m}`, close: `${esc}24${m}` },
  inverse: { open: `${esc}7${m}`, close: `${esc}27${m}` },
  bgBlack: { open: `${esc}40${m}`, close: `${esc}49${m}` },
  bgRed: { open: `${esc}41${m}`, close: `${esc}49${m}` },
  bgGreen: { open: `${esc}42${m}`, close: `${esc}49${m}` },
  bgYellow: { open: `${esc}43${m}`, close: `${esc}49${m}` },
  bgBlue: { open: `${esc}44${m}`, close: `${esc}49${m}` },
  bgMagenta: { open: `${esc}45${m}`, close: `${esc}49${m}` },
  bgCyan: { open: `${esc}46${m}`, close: `${esc}49${m}` },
  bgWhite: { open: `${esc}47${m}`, close: `${esc}49${m}` },
};