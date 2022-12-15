import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(path.resolve(__dirname, `./input.txt`), `utf-8`);

const main = async () => {
    let ans = 0;
    const store = data.slice(0, 4).split(``);

    for (let i = 4; i < data.length; i++) {
        const newStore = [];
        let pass = true;

        for (const item of store) {
            if (newStore.includes(item)) {
                pass = false;
                break;
            }
            newStore.push(item);
        }

        if (pass) {
            ans = i;
            break;
        } else {
            store.shift();
            store.push(data[i]);
        }
    }

    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;
