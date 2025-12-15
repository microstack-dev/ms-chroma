# ms-chroma

A minimal, chainable ANSI color utility for Node.js that provides type-safe terminal styling without dependencies.

## Overview

ms-chroma solves terminal color output in Node.js by offering a simple, chainable API for ANSI escape codes. It focuses on core coloring and styling needs without feature creep.

It intentionally does not solve:
- Browser compatibility
- Advanced color spaces (RGB, truecolor)
- Plugin systems
- Non-terminal output formatting

## Installation

```bash
npm install @microstack-dev/ms-chroma
pnpm add @microstack-dev/ms-chroma
yarn add @microstack-dev/ms-chroma
```

## Usage

### ESM

```ts
import { c } from '@microstack-dev/ms-chroma';
```

### CommonJS

```js
const { c } = require('@microstack-dev/ms-chroma');
```

## Examples

### Basic Colors

```ts
console.log(c.red('Error'));
console.log(c.green('Success'));
console.log(c.blue('Info'));
```

### Modifiers

```ts
console.log(c.bold('Important'));
console.log(c.dim('Secondary'));
console.log(c.underline('Link'));
console.log(c.inverse('Inverted'));
```

### Background Colors

```ts
console.log(c.bgRed('Alert'));
console.log(c.bgGreen('Good'));
console.log(c.bgBlue('Notice'));
```

### Chaining

```ts
console.log(c.red.bold('Critical'));
console.log(c.green.underline('Highlighted'));
```

### Nested Chaining

```ts
console.log(c.bgBlue.white.bold('Styled text'));
```

### Template Literals

```ts
const level = 'error';
console.log(c`{red ${level}} occurred at ${new Date().toISOString()}`);
```

## Template Literal Syntax

Template literals use `{style text}` blocks to apply styles inline.

- `{red Error}` applies red color to "Error"
- `{bold Warning}` applies bold to "Warning"
- Styles can be chained: `{red.bold Alert}`
- Interpolations work: `{yellow ${variable}}`
- Unknown styles are ignored silently
- No nesting of `{}` blocks within styled text

## API Reference

### `c`

A proxy-based color builder. Access properties to accumulate styles, call as a function to apply.

```ts
c.red('text')           // Red text
c.red.bold('text')      // Red bold text
c.red.bold.underline    // Builder for red bold underline
```

Edge cases:
- Empty calls return empty string: `c() === ''`
- Non-string inputs are coerced: `c.red(123) === c.red('123')`

### `strip(input: string): string`

Removes all ANSI escape sequences from the input string.

```ts
import { strip } from '@microstack-dev/ms-chroma';

strip('\x1b[31mRed\x1b[39m text') // 'Red text'
```

Edge cases:
- No ANSI codes: returns input unchanged
- Malformed sequences: removes valid patterns only

### `isColorSupported: boolean`

Indicates if ANSI colors are supported. True if `process.stdout.isTTY` is true and `process.env.NO_COLOR` is not '1'.

When false, all styling returns plain text.

## Color Support

Support is detected automatically:
- Enabled: TTY output and no NO_COLOR env var
- Disabled: Non-TTY or NO_COLOR='1'

When disabled, methods return unmodified strings. No errors thrown.

## Design Philosophy

ms-chroma embodies microstack-dev's commitment to minimalism:
- Small API surface (8 colors, 4 modifiers, 8 backgrounds)
- Zero dependencies
- Chainable, typed interface
- ANSI-only (standard, reliable)
- Stability prioritized over features

## Comparison to Chalk

Compared to Chalk, ms-chroma has narrower scope:
- No RGB/truecolor support
- No plugin ecosystem
- Smaller bundle size
- Simpler maintenance

Philosophy: ms-chroma chooses depth in ANSI styling over breadth of features.

## Performance & Size

- ANSI escape codes: minimal runtime cost
- Tree-shakable: unused styles excluded
- Zero dependencies: no bloat
- Node.js ≥18 required

## License

MIT License. Maintained by microstack-dev.