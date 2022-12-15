import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(path.resolve(__dirname, `./input.txt`), `utf-8`);

const rope = [];
const tailCount = 1;
for (let i = 0; i <= tailCount; i++) rope.push({ x: 0, y: 0 });

const moveHead = (direction) => {
    switch (direction) {
        case `U`:
            rope[0].y++;
            break;
        case `D`:
            rope[0].y--;
            break;
        case `L`:
            rope[0].x--;
            break;
        case `R`:
            rope[0].x++;
            break;
    }

    moveTail();
};

const moveTail = () => {
    const head = rope[0];
    const tail = rope[1];

    const deltaX = head.x - tail.x;
    const deltaY = head.y - tail.y;

    if (
        (Math.abs(deltaX) === 1) &&
        (Math.abs(deltaY) === 1)
    ) return;

    if (deltaX === -2 && deltaY === 0) tail.x--;
    else if (deltaX === 2 && deltaY === 0) tail.x++;
    else if (deltaX === 0 && deltaY === 2) tail.y++;
    else if (deltaX === 0 && deltaY === -2) tail.y--;

    else if (deltaX > 0 && deltaY > 0) { tail.x++; tail.y++; } else if (deltaX > 0 && deltaY < 0) { tail.x++; tail.y--; } else if (deltaX < 0 && deltaY > 0) { tail.x--; tail.y++; } else if (deltaX < 0 && deltaY < 0) { tail.x--; tail.y--; }
};

const main = async () => {
    const lines = data.split(`\n`).map(x => x.trim());

    const steps = [];
    for (const line of lines) {
        const [direction, magnitude] = line.split(/\s/g).map((x, i) => i === 1 ? parseInt(x) : x);
        for (let i = 0; i < magnitude; i++) steps.push(direction);
    }

    const rPos = [`0:0`];
    for (const direction of steps) {
        moveHead(direction);
        rPos.push(`${rope[1].x}:${rope[1].y}`);
    }

    const pos = [];
    for (const item of rPos) if (!pos.includes(item)) pos.push(item);

    const ans = pos.length;

    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;
