import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(path.resolve(__dirname, `./input.txt`), `utf-8`);

const priority = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`.split(``);

const main = async () => {
    const lines = data.split(`\n`).map(x => x.trim());
    let ans = 0;

    for (let i = 0; i < lines.length; i += 3) {
        const group = lines.slice(i, i + 3);

        let commonToken;
        for (const token of group[0]) {
            if (group.every(x => x.includes(token))) {
                commonToken = token;
                break;
            }
        }

        ans += priority.indexOf(commonToken) + 1;
    }

    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;
