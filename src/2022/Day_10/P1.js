import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(path.resolve(__dirname, `./input.txt`), `utf-8`);

let cycle = 0;
let x = 1;

const strengths = [];

const doCycle = () => {
    cycle++;
    if ([20, 60, 100, 140, 180, 220].includes(cycle)) strengths.push(x * cycle);
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
            x += magnitude;
        } else doCycle();
    }

    const ans = strengths.reduce((a, b) => a + b);

    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;
