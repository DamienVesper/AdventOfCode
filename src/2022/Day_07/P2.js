import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(path.resolve(__dirname, `./input.txt`), `utf-8`);

const expand = path => {
    if (path === `/`) return [`/`];

    const parts = path.split(`/`);
    const expanded = [`/`];

    for (let i = 1; i < parts.length; i++) expanded.push(`${parts.slice(0, i + 1).join(`/`)}`);
    return expanded;
};

const main = async () => {
    const tree = {};
    let curPath = `/`;

    const parseCommand = line => {
        const args = line.split(/\s/g);
        const command = args.shift();

        if (command === `cd`) {
            const path = args[0];

            if (path.startsWith(`/`)) curPath = path;
            else if (path.startsWith(`..`)) {
                const parts = curPath.split(`/`);
                parts.pop();

                curPath = parts.join(`/`);
                if (curPath === ``) curPath = `/`;
            } else {
                if (curPath.endsWith(`/`)) curPath += path;
                else curPath += `/${path}`;
            }

            if (tree[curPath] === undefined) tree[curPath] = 0;
        }
    };

    const lines = data.split(`\n`);

    for (const line of lines) if (line.startsWith(`$`)) parseCommand(line.slice(2));
    for (const line of lines) {
        if (line.startsWith(`$`)) parseCommand(line.slice(2));
        else {
            const rSize = line.split(/\s/g)[0];
            if (rSize !== `dir`) {
                const size = parseInt(rSize);
                const dirs = expand(curPath);

                for (const dir of dirs) tree[dir] += size;
            }
        }
    }

    const remainder = 7e7 - tree[`/`];
    let ans = 7e7;

    for (const dir of Object.values(tree).sort())
        if ((remainder + dir) >= 3e7) ans = Math.min(ans, dir);

    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;

void main();
