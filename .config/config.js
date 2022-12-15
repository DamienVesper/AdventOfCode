import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import * as dotenv from 'dotenv';
dotenv.config();

const args = process.argv.slice(2);

// NORMAL LAW
// const argv = yargs(hideBin(process.argv)).options({
//     mode: { type: `string`, default: `init` },
//     year: { type: `number`, default: 2022 },
//     day: { type: `number`, default: 1 },
//     level: { type: `number`, default: 1 }
// }).argv;

// ALTERNATIVE LAW
const date = new Date(new Date().valueOf() + 36e5);
const argv = {
    mode: args[0].toLowerCase(),
    year: 2022,
    day: args[1] ? parseInt(args[1]) : date.getDate(),
    level: args[2] ? parseInt(args[2]) : `both`
};

const config = {
    mode: argv.mode,
    year: argv.year,
    day: argv.day,
    level: argv.level,

    sessionSecret: process.env.SESSION_SECRET
};

export default config;
