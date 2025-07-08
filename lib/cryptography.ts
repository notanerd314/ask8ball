import { createHmac } from 'crypto';

/** Creates HMAC signature for parameter validation */
export function signParams(args: string[], secret: string): string {
  const data = args.join('|');
  return createHmac('sha256', secret).update(data).digest('hex');
}