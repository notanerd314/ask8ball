import { createHmac } from 'crypto';

export function signParams(args: string[], secret: string): string {
  const data = args.join('|');
  return createHmac('sha256', secret).update(data).digest('hex');
}