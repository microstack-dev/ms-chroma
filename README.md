# ms-chroma

A tiny, modern ANSI color utility for Node.js that provides chainable color styling with template literal support.

## Installation

```bash
npm install @microstack-dev/ms-chroma
```

## Usage

### ESM

```ts
import { c } from '@microstack-dev/ms-chroma';

console.log(c.red('Error'));
console.log(c.green.bold('Success'));
console.log(c.bgBlue.white('Info'));
```

### CommonJS

```js
const { c } = require('@microstack-dev/ms-chroma');

console.log(c.red('Error'));
```

### Chaining

```ts
console.log(c.red.bold.underline('Alert'));
```

### Template Literals

```ts
const time = new Date().toLocaleTimeString();
console.log(c`{red Error} at {yellow ${time}}`);
```

## API Reference

### `c`
A chainable color builder that applies ANSI escape codes to strings. Supports property access for styles and function calls for application.

### `strip(input: string): string`
Removes all ANSI escape sequences from the input string.

```ts
import { strip } from '@microstack-dev/ms-chroma';

console.log(strip('\x1b[31mRed\x1b[39m')); // 'Red'
```

### `isColorSupported: boolean`
Indicates whether ANSI colors are supported in the current environment. Checks if `process.stdout.isTTY` is true and `process.env.NO_COLOR` is not set to '1'.

## Supported Styles

### Foreground Colors
- black
- red
- green
- yellow
- blue
- magenta
- cyan
- white

### Modifiers
- bold
- dim
- underline
- inverse

### Background Colors
- bgBlack
- bgRed
- bgGreen
- bgYellow
- bgBlue
- bgMagenta
- bgCyan
- bgWhite

## Color Support

Colors are automatically disabled if the terminal does not support them or if the `NO_COLOR` environment variable is set to '1'. In such cases, plain text is returned without ANSI codes.

## License

MIT