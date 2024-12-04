import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(path.resolve(__dirname, `./input.txt`), `utf-8`);

const main = async () => {
    const exts = [...data.matchAll(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g)].map(x => x[0]);
    let enabled = true;

    const muls = [];
    for (const ext of exts) {
        if (ext === `do()`) enabled = true;
        else if (ext === `don't()`) enabled = false;
        else if (enabled) muls.push(ext);
    }

    const ans = [...muls].map(x => x.slice(4).split(`,`).map(x => parseInt(x))).map(x => x[0] * x[1]).reduce((a, b) => a + b);
    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;
