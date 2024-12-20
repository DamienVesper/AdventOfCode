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

    const scores = {};
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines.length; j++)
            scores[`${i}:${j}`] = 1;
    }

    for (let i = 0; i < xMap.length; i++) {
        for (let j = 0; j < xMap[i].length; j++) {
            const arr = xMap[i];
            const point = arr[j];

            const score = {
                x1: -1,
                x2: -1
            };

            for (let k = j; k >= 0; k--) {
                score.x1++;
                if (k !== j && arr[k] >= point) break;
            }

            for (let k = j; k < arr.length; k++) {
                score.x2++;
                if (k !== j && arr[k] >= point) break;
            }

            scores[`${i}:${j}`] *= score.x1 * score.x2;
        }
    }

    for (let i = 0; i < yMap.length; i++) {
        for (let j = 0; j < yMap[i].length; j++) {
            const arr = yMap[i];
            const point = arr[j];

            const score = {
                y1: -1,
                y2: -1
            };

            for (let k = j; k >= 0; k--) {
                score.y1++;
                if (k !== j && arr[k] >= point) break;
            }

            for (let k = j; k < arr.length; k++) {
                score.y2++;
                if (k !== j && arr[k] >= point) break;
            }

            scores[`${j}:${i}`] *= score.y1 * score.y2;
        }
    }

    let ans = 0;
    for (let i = 0; i < Math.sqrt(Object.keys(scores).length); i++) {
        for (let j = 0; j < Math.sqrt(Object.keys(scores).length); j++)
            ans = Math.max(ans, scores[`${i}:${j}`]);
    }

    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;
