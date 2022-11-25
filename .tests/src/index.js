import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import config from './config.js';
import Client from './Client.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const client = new Client();

if (config.mode === `GET`) client.getInput();
else if (config.mode === `SOLVE`) client.submitAnswer(fs.readFileSync(path.resolve(__dirname, `../staging/output.txt`), `utf-8`));
