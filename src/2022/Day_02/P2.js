import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(path.resolve(__dirname, `./input.txt`), `utf-8`);

const main = async () => {
    const lines = data.split(`\n`).map(x => x.trim());
    let ans = 0;

    const aS = `ABC`.split(``);
    const bS = `XYZ`.split(``);

    for (const line of lines) {
        const [a, b] = line.split(` `).map(x => x.trim());

        const won = b === `Z`;
        const draw = b === `Y`;

        let c = ``;
        if (draw) c = bS[aS.indexOf(a)];
        else {
            if (a === `A`) c = won ? `Y` : `Z`;
            else if (a === `B`) c = won ? `Z` : `X`;
            else c = won ? `X` : `Y`;
        }

        if (won) ans += 6;
        else if (draw) ans += 3;

        if (c === `X`) ans += 1;
        else if (c === `Y`) ans += 2;
        else ans += 3;
    }

    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;
