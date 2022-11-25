import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import * as dotenv from 'dotenv';
dotenv.config();

const argv = yargs(hideBin(process.argv)).options({
    mode: { type: `string`, default: `GET` },
    year: { type: `number`, default: 2015 },
    day: { type: `number`, default: 1 },
    level: { type: `number`, default: 1 }
}).argv;


const config = {
    mode: argv.mode,
    year: argv.year,
    day: argv.day,
    level: argv.level,

    sessionSecret: process.env.SESSION_SECRET
};

export default config;
