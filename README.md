# ms-chroma

[![npm version](https://badge.fury.io/js/%40microstack-dev%2Fms-chroma.svg)](https://badge.fury.io/js/%40microstack-dev%2Fms-chroma)
[![npm downloads](https://img.shields.io/npm/dm/%40microstack-dev%2Fms-chroma.svg)](https://www.npmjs.com/package/@microstack-dev/ms-chroma)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/%40microstack-dev%2Fms-chroma)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

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
console.log(c.hidden('Secret'));
console.log(c.visible('Text'));
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
console.log(c.red.bold.reset('Plain'));
```

### Nested Chaining

```ts
console.log(c.bgBlue.white.bold('Styled text'));
```

### Template Literals

```ts
const level = 'error';
console.log(c`{red ${level}} occurred at ${new Date().toISOString()}`);
console.log(c`{hidden Secret} {visible Visible}`);
```

## Template Literal Syntax

Template literals use `{style text}` blocks to apply styles inline.

- `{red Error}` applies red color to "Error"
- `{bold Warning}` applies bold to "Warning"
- Styles can be chained: `{red.bold Alert}`
- Reset styles: `{reset Plain}` clears all styles
- Visibility: `{hidden Secret}` or `{visible Text}`
- Interpolations work: `{yellow ${variable}}`
- Unknown styles are ignored silently
- No nesting of `{}` blocks within styled text

## API Reference

### `c`

A proxy-based color builder. Access properties to accumulate styles, call as a function to apply.

```ts
c.red('text')           // Red text
c.red.bold('text')      // Red bold text
c.red.bold.reset('text') // Plain text (reset clears styles)
c.red.bold.underline    // Builder for red bold underline
c.enable().red('text')  // Red text (force enable colors)
c.disable().red('text') // Plain text (force disable colors)
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

You can manually override detection:
- `c.enable()` forces color output
- `c.disable()` forces plain text output

## Design Philosophy

ms-chroma embodies microstack-dev's commitment to minimalism:
- Small API surface (8 colors, 6 modifiers, 8 backgrounds)
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