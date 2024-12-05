import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(path.resolve(__dirname, `./input.txt`), `utf-8`);

const main = async () => {
    const rdata = data.split(`\n\n`);

    const rules = rdata[0].split(`\n`).map(x => x.split(`|`).map(x => parseInt(x)));
    const updates = rdata[1].split(`\n`).map(x => x.split(`,`).map(x => parseInt(x)));

    const ans = updates.map(x => {
        for (const rule of rules) {
            const x1 = x.indexOf(rule[0]);
            const x2 = x.indexOf(rule[1]);

            if (x1 !== -1 && x2 !== -1 && x1 > x2) return 0;
        }

        return x[Math.floor(x.length / 2)];
    }).reduce((a, b) => a + b);

    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;
