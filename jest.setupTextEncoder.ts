import { TextEncoder, TextDecoder } from 'text-encoding';

if (typeof globalThis.TextEncoder === 'undefined') {
  // @ts-ignore
  globalThis.TextEncoder = TextEncoder;
}

if (typeof globalThis.TextDecoder === 'undefined') {
  // @ts-ignore
  globalThis.TextDecoder = TextDecoder;
}
