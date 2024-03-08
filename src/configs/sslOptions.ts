import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
config({ path: '.env' });

export const sslOptions: { key: Buffer; cert: Buffer; passphrase: string } = {
  key: fs.readFileSync(path.join(__dirname, '../../ssl/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../../ssl/cert.pem')),
  passphrase: process.env.SSL_PASSPHRASE || '',
};
