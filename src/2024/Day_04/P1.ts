import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

import { searchForWord } from '../../../utils/utils';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(path.resolve(__dirname, `./input.txt`), `utf-8`);

const DIRS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, -1],
    [0, 1]
];

const main = async () => {
    const grid = data.split(`\n`).map(x => x.split(``));

    let ans = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            // eslint-disable-next-line curly
            for (const dir of DIRS) {
                if (searchForWord(grid, `XMAS`, j, i, dir[0], dir[1])) ans++;
            }
        }
    }

    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;
