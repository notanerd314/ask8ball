import { createHmac, timingSafeEqual } from 'crypto';
import { ShareData, createShareSignature, verifyShareSignature } from './utils/share';

/** 
 * Creates HMAC signature for parameter validation
 * @deprecated Use createShareSignature from utils/share instead
 * @param args - Array of strings to sign
 * @param secret - Secret key for signing
 * @returns HMAC signature as hex string
 */
export function signParams(args: string[], secret: string): string {
  const data = args.join('|');
  return createHmac('sha256', secret).update(data).digest('hex');
}

/** 
 * Verifies HMAC signature with timing-safe comparison
 * @deprecated Use verifyShareSignature from utils/share instead
 * @param args - Array of strings that were signed
 * @param signature - Signature to verify
 * @param secret - Secret key used for signing
 * @returns Whether signature is valid
 */
export function verifyParams(args: string[], signature: string, secret: string): boolean {
  const expectedSignature = signParams(args, secret);
  
  try {
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');
    const providedBuffer = Buffer.from(signature, 'hex');
    
    if (expectedBuffer.length !== providedBuffer.length) {
      return false;
    }
    
    return timingSafeEqual(expectedBuffer, providedBuffer);
  } catch {
    return false;
  }
}
// Re-export new functions for backward compatibility
export { createShareSignature, verifyShareSignature, encodeShareData, decodeShareData } from './utils/share';