import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(path.resolve(__dirname, `./input.txt`), `utf-8`);

const rulesFailed = (data: number[], rules: number[][], track?: number): number[][] => {
    const fails: number[][] = [];
    for (const rule of rules) {
        const x1 = data.indexOf(rule[0]);
        const x2 = data.indexOf(rule[1]);

        if (track !== undefined && !rule.includes(track)) continue;
        if (x1 !== -1 && x2 !== -1 && x1 > x2 && !fails.includes(rule)) fails.push(rule);
    }

    return fails;
};

const main = async () => {
    const rdata = data.split(`\n\n`);

    const rules = rdata[0].split(`\n`).map(x => x.split(`|`).map(x => parseInt(x)));
    const updates = rdata[1].split(`\n`).map(x => x.split(`,`).map(x => parseInt(x)));

    const ans = updates.map(x => {
        let fails = rulesFailed(x, rules);
        if (fails.length === 0) return 0;

        while (fails.length !== 0) {
            for (const fail of fails) {
                for (let i = 0; i < x.length; i++) {
                    const track = x.splice(x.indexOf(fail[1]), 1)[0]; // only need to move one
                    x.splice(i, 0, fail[1]);

                    if (rulesFailed(x, rules, track).length === 0) break;
                }
            }

            fails = rulesFailed(x, rules);
        }

        return x[Math.floor(x.length / 2)];
    }).reduce((a, b) => a + b);

    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;
