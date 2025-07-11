import { createHmac, timingSafeEqual } from 'crypto';

export interface ShareData {
  question: string;
  response: string;
  personality: string;
  timestamp: number;
}

const SHARE_URL_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export function createShareSignature(data: ShareData, secret: string): string {
  const payload = `${data.question}|${data.response}|${data.personality}|${data.timestamp}`;
  return createHmac('sha256', secret).update(payload).digest('hex');
}

export function verifyShareSignature(data: ShareData, signature: string, secret: string): boolean {
  const expectedSignature = createShareSignature(data, secret);
  
  // Use timing-safe comparison to prevent timing attacks
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

export function isShareDataExpired(timestamp: number): boolean {
  return Date.now() - timestamp > SHARE_URL_EXPIRY;
}

export function encodeShareData(data: ShareData, signature: string): string {
  const payload = {
    ...data,
    sig: signature
  };
  
  const jsonString = JSON.stringify(payload);
  return Buffer.from(jsonString)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function decodeShareData(encoded: string): ShareData & { sig: string } {
  try {
    const base64 = encoded
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    // Add padding if needed
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
    
    const jsonString = Buffer.from(padded, 'base64').toString('utf-8');
    const data = JSON.parse(jsonString);
    
    // Validate required fields
    if (!data.question || !data.response || !data.personality || !data.timestamp || !data.sig) {
      throw new Error('Missing required fields');
    }
    
    return data;
  } catch (error) {
    throw new Error('Invalid share data format');
  }
}