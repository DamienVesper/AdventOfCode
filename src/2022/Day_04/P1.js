import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(path.resolve(__dirname, `./input.txt`), `utf-8`);

const expand = range => {
    const coords = [];

    const [x1, x2] = range.split(`-`).map(x => parseInt(x));
    for (let i = x1 - 1; i <= x2 + 1; i++) coords.push(i);

    return coords.map(x => String(x));
};

const main = async () => {
    const lines = data.split(`\n`).map(x => x.trim());
    let ans = 0;

    for (const line of lines) {
        const elves = line.split(`,`);
        const a = expand(elves[0]).join(``);
        const b = expand(elves[1]).join(``);

        if (a.includes(b) || b.includes(a)) ans++;
    }

    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;
