import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(path.resolve(__dirname, `./input.txt`), `utf-8`);

const main = async () => {
    const lines = data.split(`\n`);

    const a = [];
    const b = [];

    for (const line of lines) {
        const [x, y] = line.split(`   `);
        a.push(x);
        b.push(y);
    }

    const ans = a.map(x => x * b.filter(y => y === x).length).reduce((a, b) => a + b);
    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), ans);

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;
