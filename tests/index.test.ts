// Set before any import
process.stdout.isTTY = true;
delete process.env.NO_COLOR;

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { c, strip, isColorSupported } from '../src';

describe('ms-chroma', () => {
  describe('colors', () => {
    it('red', () => {
      expect(c.red('test')).toBe('\x1b[31mtest\x1b[39m');
    });

    it('green', () => {
      expect(c.green('test')).toBe('\x1b[32mtest\x1b[39m');
    });

    // Add for all colors
    it('black', () => {
      expect(c.black('test')).toBe('\x1b[30mtest\x1b[39m');
    });

    it('yellow', () => {
      expect(c.yellow('test')).toBe('\x1b[33mtest\x1b[39m');
    });

    it('blue', () => {
      expect(c.blue('test')).toBe('\x1b[34mtest\x1b[39m');
    });

    it('magenta', () => {
      expect(c.magenta('test')).toBe('\x1b[35mtest\x1b[39m');
    });

    it('cyan', () => {
      expect(c.cyan('test')).toBe('\x1b[36mtest\x1b[39m');
    });

    it('white', () => {
      expect(c.white('test')).toBe('\x1b[37mtest\x1b[39m');
    });
  });

  describe('modifiers', () => {
    it('bold', () => {
      expect(c.bold('test')).toBe('\x1b[1mtest\x1b[22m');
    });

    it('dim', () => {
      expect(c.dim('test')).toBe('\x1b[2mtest\x1b[22m');
    });

    it('underline', () => {
      expect(c.underline('test')).toBe('\x1b[4mtest\x1b[24m');
    });

    it('inverse', () => {
      expect(c.inverse('test')).toBe('\x1b[7mtest\x1b[27m');
    });
  });

  describe('backgrounds', () => {
    it('bgRed', () => {
      expect(c.bgRed('test')).toBe('\x1b[41mtest\x1b[49m');
    });

    // Add others if needed, but for brevity
  });

  describe('chaining', () => {
    it('red bold', () => {
      expect(c.red.bold('test')).toBe('\x1b[31m\x1b[1mtest\x1b[22m\x1b[39m');
    });

    it('bgBlue white', () => {
      expect(c.bgBlue.white('test')).toBe('\x1b[44m\x1b[37mtest\x1b[39m\x1b[49m');
    });
  });

  describe('template literals', () => {
    it('simple', () => {
      expect(c`{red Error}`).toBe('\x1b[31mError\x1b[39m');
    });

    it('with interpolation', () => {
      const time = 'now';
      expect(c`{red Error} at {yellow ${time}}`).toBe('\x1b[31mError\x1b[39m at \x1b[33mnow\x1b[39m');
    });
  });

  describe('strip', () => {
    it('removes ansi', () => {
      expect(strip('\x1b[31mError\x1b[39m')).toBe('Error');
    });

    it('multiple', () => {
      expect(strip('\x1b[31m\x1b[1mError\x1b[22m\x1b[39m')).toBe('Error');
    });
  });

  describe('color support', () => {
    it('is boolean', () => {
      expect(typeof isColorSupported).toBe('boolean');
    });
  });

  describe('when colors disabled', () => {
    beforeEach(() => {
      process.env.NO_COLOR = '1';
    });

    afterEach(() => {
      delete process.env.NO_COLOR;
    });

    it('returns plain text', () => {
      expect(c.red('test')).toBe('test');
    });

    it('strip works', () => {
      expect(strip('\x1b[31mtest\x1b[39m')).toBe('test');
    });
  });
});