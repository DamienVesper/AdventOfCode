import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

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

/**
 * Functions to solve for a word search.
 */
export const searchForWord = (grid: string[][], str: string, x: number, y: number, vx: number, vy: number): [number, number] | false => {
    if (
        x + (str.length - 1) * vx >= grid[0].length
        || x + (str.length - 1) * vx < 0
        || y + (str.length - 1) * vy >= grid.length
        || y + (str.length - 1) * vy < 0
    ) return false;

    for (let k = 0; k < str.length; k++) if (grid[y + (vy * k)][x + (vx * k)] !== str[k]) return false;
    return [x + vx, y + vy];
};

const main = async () => {
    const grid = data.split(`\n`).map(x => x.split(``));

    let res = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            // eslint-disable-next-line curly
            for (const dir of DIRS) {
                const query = searchForWord(grid, `MAS`, j, i, dir[0], dir[1]);
                if (query && dir[0] !== 0 && dir[1] !== 0) res.push({ dir, center: query });
            }
        }
    }

    let ans = 0;
    const resCopy = new Array(...res);

    for (const hit of resCopy) {
        if (hit.dir[0] === 0 || hit.dir[1] === 0) continue;

        const centers = res.filter(x => x.center[0] === hit.center[0] && x.center[1] === hit.center[1] && x.dir[0] !== 0 && x.dir[1] !== 0);
        res = res.filter(x => !(x.center[0] === hit.center[0] && x.center[1] === hit.center[1]));

        if (centers.length > 1) ans++;
    }

    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;
