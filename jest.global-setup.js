import util from 'util';
import { config } from 'dotenv';
import crypto from 'crypto';
import { exec } from 'child_process';

export default async () => {
  config({ parth: '.env.test' });
  const execSync = util.promisify(exec);
  global.__SCHEMA__ = `test_${crypto.randomUUID()}`
  process.env.DATABASE_URL = `${process.env.DATABASE_URL}?schema=${global.__SCHEMA__}`

  await execSync(`${prismaBinary} migrate deploy`)
}