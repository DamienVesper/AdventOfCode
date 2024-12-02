import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(path.resolve(__dirname, `./input.txt`), `utf-8`);

const main = async () => {
    const lines = data.split(`\n`);

    let ans = 0;
    for (const line of lines) {
        const nums = line.split(` `).map(x => parseInt(x));

        let isIncreasing = undefined;
        let isDecreasing = undefined;
        let isSafe = true;

        nums.forEach((f, i) => {
            if (i !== 0) {
                const prev = nums[i - 1];

                if (prev < f) {
                    isIncreasing === undefined ? isIncreasing = true : void 0;
                    isSafe = isSafe && isIncreasing && !isDecreasing;
                }
                else if (prev > f) {
                    isDecreasing === undefined ? isDecreasing = true : void 0;
                    isSafe = isSafe && isDecreasing && !isIncreasing;
                }
                else isSafe = false;

                isSafe = isSafe && Math.abs(f - prev) <= 3 && Math.abs(f - prev) >= 1;
            }
        });

        isSafe && ans++;
    }

    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), ans);

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;
