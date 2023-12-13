import {Buffer} from "buffer";

export function getUserIdFromToken(token: string): string {
    const payload = token.split('.')[1];
    
    const base64 = payload.replace('-', '+').replace('_', '/');
    const jwt = JSON.parse(Buffer.from(base64, 'base64').toString());
    return jwt.sub;
}