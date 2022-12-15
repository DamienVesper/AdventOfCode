import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(path.resolve(__dirname, `./input.txt`), `utf-8`);

let cycle = 0;
let X = 1;

const grid = new Array(6);
for (let i = 0; i < grid.length; i++) {
    grid[i] = [];

    const row = grid[i];
    for (let j = 0; j < 40; j++) row.push(` `);
}

const doCycle = () => {
    cycle++;

    const x = (cycle - 1) % 40;
    const y = Math.ceil(cycle / 40) - 1;

    const coords = [X - 1, X, X + 1];
    if (coords.includes(x)) grid[y][x] = `#`;
};

const main = async () => {
    const lines = data.split(`\n`).map(x => x.trim()).map(x => {
        const data = x.split(` `);
        return [data[0], parseInt(data[1])];
    });

    for (let i = 1; i <= lines.length; i++) {
        const line = lines[i - 1];
        const [action, magnitude] = line;

        if (action === `addx`) {
            doCycle();
            doCycle();
            X += magnitude;
        } else doCycle();
    }

    const output = grid.map(x => x.join(``)).join(`\n`);

    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(output));

    if (process.argv.length <= 3) console.log(`Result: \n${new Array(40).fill(`-`).join(``)}\n${output}`);
    return `\n${output}`;
};

if (process.argv.length <= 3) void main();
export default main;
