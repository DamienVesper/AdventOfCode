/* eslint-disable @typescript-eslint/no-unused-vars */
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import * as dotenv from 'dotenv';
dotenv.config();

interface Args {
    mode: `init` | `input` | `run` | `output`
    
}

const date = new Date(new Date().valueOf() + 36e5);
const argv = yargs(hideBin(process.argv)).options({
    mode: { type: `string`, default: `init` },
    year: { type: `number`, default: 2024 },
    day: { type: `number`, default: date.getDate() },
    level: { type: `string`, default: `both` }
}).argv as Args;

const config = {
    mode: argv.mode,
    year: argv.year,
    day: argv.day,
    level: argv.level,

    sessionSecret: process.env.SESSION_SECRET
};

export default config;
