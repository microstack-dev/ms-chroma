import { Style, styles } from './styles';
import { isColorSupported } from './support';

function applyStyles(text: string, styles: Style[]): string {
  if (!isColorSupported()) return text;
  const opens = styles.map(s => s.open).join('');
  const closes = styles.map(s => s.close).reverse().join('');
  return opens + text + closes;
}

function applyTemplate(strings: TemplateStringsArray, values: any[], currentStyles: Style[]): string {
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
      return applyStyles(content, [style]);
    }
    return match;
  });
  return applyStyles(styled, currentStyles);
}

export function createBuilder(currentStyles: Style[] = []): any {
  const apply = (text: string) => applyStyles(text, currentStyles);

  const proxy = new Proxy(apply, {
    get(target, prop: string) {
      if (prop in styles) {
        return createBuilder([...currentStyles, styles[prop]]);
      }
      return target[prop];
    },
    apply(target, thisArg, args) {
      if (args.length === 0) return apply('');
      if (Array.isArray(args[0]) && 'raw' in args[0]) {
        // Template literal
        return applyTemplate(args[0], args.slice(1), currentStyles);
      }
      return apply(String(args[0]));
    },
  });

  return proxy;
}