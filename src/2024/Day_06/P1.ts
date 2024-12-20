import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(path.resolve(__dirname, `./input.txt`), `utf-8`);

const main = async () => {
    const grid = data.split(`\n`).map(x => x.split(``));

    let x = 0;
    let y = 0;

    let dir = [0, -1];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === `^`) {
                x = j;
                y = i;
                break;
            }
        }
    }

    grid[y][x] = `X`;
    while (
        x >= 0
        && y >= 0
        && x < grid[0].length
        && y < grid.length
    ) {
        const newPos = [x + dir[0], y + dir[1]];
        if (
            newPos[0] < 0
            || newPos[1] < 0
            || newPos[0] >= grid[0].length
            || newPos[1] >= grid.length
        ) break;
        if (grid[newPos[1]][newPos[0]] === `#`) {
            if (dir[0] === 0 && dir[1] === -1) dir = [1, 0];
            else if (dir[0] === 1 && dir[1] === 0) dir = [0, 1];
            else if (dir[0] === 0 && dir[1] === 1) dir = [-1, 0];
            else if (dir[0] === -1 && dir[1] === 0) dir = [0, -1];
        } else {
            x += dir[0];
            y += dir[1];

            grid[newPos[1]][newPos[0]] = `X`;
        }
    }

    const ans = grid.map(x => x.filter(x => x === `X`).length).reduce((a, b) => a + b);
    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), grid.map(x => x.join(``)).join(`\n`));

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;
