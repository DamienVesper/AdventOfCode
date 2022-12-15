import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(path.resolve(__dirname, `./input.txt`), `utf-8`);

const main = async () => {
    const lines = data.split(`\n`).map(x => x.trim());

    const xMap = new Array(lines.length).fill(new Array(lines.length).fill(0));
    for (let i = 0; i < lines.length; i++) xMap[i] = lines[i].split(``).map(x => parseInt(x));

    const yMap = xMap[0].map((_, i) => xMap.map(x => x[i]));

    const rPos = [];
    for (let i = 0; i < xMap.length; i++) {
        for (let j = 0; j < xMap[i].length; j++) {
            const arr = xMap[i];
            const point = arr[j];

            const isVisible = {
                x1: true,
                x2: true
            };

            for (let k = 0; k < j; k++) {
                if (arr[k] >= point) {
                    isVisible.x1 = false;
                    break;
                }
            }

            for (let k = arr.length - 1; k > j; k--) {
                if (arr[k] >= point) {
                    isVisible.x2 = false;
                    break;
                }
            }

            if (Object.values(isVisible).includes(true)) rPos.push(`${i}:${j}`);
        }
    }

    for (let i = 0; i < yMap.length; i++) {
        for (let j = 0; j < yMap[i].length; j++) {
            const arr = yMap[i];
            const point = arr[j];

            const isVisible = {
                y1: true,
                y2: true
            };

            for (let k = 0; k < j; k++) {
                if (arr[k] >= point) {
                    isVisible.y1 = false;
                    break;
                }
            }

            for (let k = arr.length - 1; k > j; k--) {
                if (arr[k] >= point) {
                    isVisible.y2 = false;
                    break;
                }
            }

            if (Object.values(isVisible).includes(true)) rPos.push(`${j}:${i}`);
        }
    }

    const pos = [];
    for (const item of rPos) {
        if (pos.includes(item)) continue;
        pos.push(item);
    }

    const ans = pos.length;
    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;
