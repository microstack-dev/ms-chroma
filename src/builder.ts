import { styles } from './styles';
import { isColorSupported } from './support';

function applyStyles(text: string, styleNames: string[], colorEnabled?: boolean): string {
  const enabled = colorEnabled !== undefined ? colorEnabled : isColorSupported();
  if (!enabled) return text;
  const activeStyles = styleNames.map(name => styles[name]).filter(Boolean);
  const opens = activeStyles.map(s => s.open).join('');
  const closes = activeStyles.map(s => s.close).reverse().join('');
  return opens + text + closes;
}

function applyTemplate(strings: TemplateStringsArray, values: any[], styleNames: string[], colorEnabled?: boolean): string {
  const parts: string[] = [];
  for (let i = 0; i < strings.length; i++) {
    parts.push(strings[i]);
    if (i < values.length) {
      parts.push(String(values[i]));
    }
  }
  const full = parts.join('');
  const regex = /{(\w+)\s+([^}]+)}/g;
  const styled = full.replace(regex, (match, styleName, content) => {
    const style = styles[styleName];
    if (style) {
      return applyStyles(content, [styleName], colorEnabled);
    }
    return match;
  });
  return applyStyles(styled, styleNames, colorEnabled);
}

export function createBuilder(styleNames: string[] = [], colorEnabled?: boolean): any {
  const apply = (text: string) => applyStyles(text, styleNames, colorEnabled);

  const proxy = new Proxy(apply, {
    get(target, prop: string) {
      if (prop === 'reset') {
        return createBuilder([], colorEnabled);
      }
      if (prop === 'enable') {
        return () => createBuilder(styleNames, true);
      }
      if (prop === 'disable') {
        return () => createBuilder(styleNames, false);
      }
      if (prop in styles && !styleNames.includes(prop)) {
        return createBuilder([...styleNames, prop], colorEnabled);
      }
      return (target as any)[prop];
    },
    apply(target, thisArg, args) {
      if (args.length === 0) return apply('');
      if (Array.isArray(args[0]) && 'raw' in args[0]) {
        // Template literal
        return applyTemplate(args[0] as TemplateStringsArray, args.slice(1), styleNames, colorEnabled);
      }
      return apply(String(args[0]));
    },
  });

  return proxy;
}