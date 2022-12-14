import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(path.resolve(__dirname, `./input.txt`), `utf-8`);

const priority = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`.split(``);

const main = async () => {
    const lines = data.split(`\n`).map(x => x.trim());
    let ans = 0;

    for (const line of lines) {
        const compartments = [line.slice(0, line.length / 2), line.slice(line.length / 2)];

        const alreadyFound = compartments[0].split(``);
        let dupeItem;
        for (const item of compartments[1]) {
            if (alreadyFound.includes(item)) {
                dupeItem = item;
                break;
            }
        }

        ans += priority.indexOf(dupeItem) + 1;
    }

    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;
