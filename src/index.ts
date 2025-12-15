import { createBuilder } from './builder';
import { strip } from './strip';
import { isColorSupported as isColorSupportedFn } from './support';

export const isColorSupported: boolean = isColorSupportedFn();

export const c = createBuilder();

export { strip };