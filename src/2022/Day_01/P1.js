import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(path.resolve(__dirname, `./input.txt`), `utf-8`);

const main = async () => {
    const lines = data.split(`\n\n`).map(x => x.trim());

    let ans = 0;
    for (const line of lines) {
        const cals = line.split(`\n`).map(x => parseInt(x.trim()));
        ans = Math.max(ans, cals.reduce((a, b) => a + b));
    }

    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;
