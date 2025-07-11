import { createHmac } from 'crypto';

/** 
 * Creates HMAC signature for parameter validation
 * @param args - Array of strings to sign
 * @param secret - Secret key for signing
 * @returns HMAC signature as hex string
 */
export function signParams(args: string[], secret: string): string {
  const data = args.join('|');
  return createHmac('sha256', secret).update(data).digest('hex');
}

export function encodeShareData(question: string, response: string, personality: string, sig: string): string {
  const escape = (str: string) =>
    str.replace(/\\/g, '\\\\').replace(/\|/g, '\\p').replace(/\n/g, '\\n');

  const raw = [question, response, personality].map(escape).join('|');

  const base64 = btoa(raw) // browser-safe
    .replace(/\+/g, '-')   // make URL-safe
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return base64;
}

export function decodeShareData(encoded: string): { question: string, response: string, personality: string, sig: string } {
  const base64 = encoded
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const raw = atob(base64);

  const unescape = (str: string) =>
    str.replace(/\\n/g, '\n').replace(/\\p/g, '|').replace(/\\\\/g, '\\');

  const spilttedString = raw.split('|');

  if (spilttedString.length !== 4) {
    throw new Error('Invalid share data');
  }

  const [question, response, personality, sig] = spilttedString.map(unescape);

  return { question, response, personality, sig };
}
