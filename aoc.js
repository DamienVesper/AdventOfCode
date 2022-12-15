/**
 * Advent Of Code Submission Utility
 * @description Helper scripts to run and submit solutions for Advent Of Code.
 * @author DamienVesper
 */

import config from './.config/config.js';

import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

import core from './utils/core.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const client = core.aoc;

const main = async () => {
    const day = config.day.toString().padStart(2, `0`);
    const folderPath = path.resolve(__dirname, `./src/${config.year}/Day_${day}`);

    if (config.mode === `init`) {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);

            const template = fs.readFileSync(path.resolve(__dirname, `./.templates/solution.js`));
            fs.writeFileSync(path.resolve(folderPath, `P1.js`), template, `utf-8`);
            fs.writeFileSync(path.resolve(folderPath, `P2.js`), template, `utf-8`);

            console.log(`Succesfully initialized files for day ${day}.`);
        } else console.log(`[ERROR]: Directory already exists. Please remove the directory and run this command again.`);
    } else if (config.mode === `input`) {
        if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

        const input = await client.getInput();
        fs.writeFileSync(path.resolve(folderPath, `input.txt`), input, `utf-8`);

        console.log(`Succesfully saved input for day ${day}.`);
    } else if (config.mode === `run`) {
        const part = config.level;

        if (part === `both`) {
            const solution1 = await (await import(`./src/${config.year}/Day_${day}/P1.js`))?.default();
            const solution2 = await (await import(`./src/${config.year}/Day_${day}/P2.js`))?.default();

            console.log(`DAY ${day}:\n-------\nPART 1: ${solution1}\nPART 2: ${solution2}`);
        } else {
            const solution = await import(path.resolve(folderPath, `P${part}.js`))?.default();
            console.log(`DAY ${day}:\n-------\nPART ${part}: ${solution}`);
        }
    } else if (config.mode === `output`) {
        const output = fs.readFileSync(path.resolve(folderPath, `output.txt`));
        console.log(`DAY ${day} OUTPUT:\n--------------\n${output}`);
    }
};

void main();
