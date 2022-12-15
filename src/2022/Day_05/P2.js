import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(path.resolve(__dirname, `./input.txt`), `utf-8`);

const main = async () => {
    const steps = data.split(`\n\n`)[1].split(`\n`).map(x => x.trim().split(/\s/g).filter(x => !isNaN(parseInt(x))).map(x => parseInt(x)));

    const rCrates = data.split(`\n\n`)[0].split(`\n`).slice(0, -1).map(x => x.replace(/\s{4}/g, `-`).replace(/\s|\[|]/g, ``).split(``));
    const crates = new Array(rCrates[0].length).fill([]);

    for (let i = 0; i < rCrates[0].length; i++) {
        const newArr = [];
        for (let j = 0; j < rCrates.length; j++) {
            newArr.push(rCrates[j][i]);
            crates[i] = newArr.filter(x => x !== `-`).reverse();
        }
    }

    for (const step of steps) {
        const [quantity, pos1, pos2] = step;

        const curCrates = [];
        for (let i = 0; i < quantity; i++) curCrates.push(crates[pos1 - 1].pop());

        crates[pos2 - 1].push(...curCrates.reverse());
    }

    const ans = crates.map(x => x.pop()).join(``);
    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;
