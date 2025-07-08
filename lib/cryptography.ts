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