import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = fs.readFileSync(path.resolve(__dirname, `./input.txt`), `utf-8`);

const main = async () => {
    const monkeys = data.split(`\n\n`).map(x => x.trim()).map(x => {
        const data = x.split(`\n`).map(x => x.trim());

        const items = data[1].slice(16).split(`, `).map(x => parseInt(x));
        const operation = data[2].slice(17);
        const test = parseInt(data[3].slice(19));

        const doIfTrue = parseInt(data[4].slice(25));
        const doIfFalse = parseInt(data[5].slice(26));

        return { items, operation, test, doIfTrue, doIfFalse, monkeyBusiness: 0 };
    });

    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < monkeys.length; j++) {
            const monkey = monkeys[j];
            const { test, doIfTrue, doIfFalse } = monkey;

            const items = [...monkey.items];
            for (const item of items) {
                monkey.items.shift();

                const operation = String(monkey.operation);
                const res = Math.floor(eval(operation.replace(/old/g, item)) / 3);

                const passesTest = res % test === 0;
                monkeys[passesTest ? doIfTrue : doIfFalse].items.push(res);
                monkey.monkeyBusiness++;
            }
        }
    }

    monkeys.sort((a, b) => b.monkeyBusiness - a.monkeyBusiness);

    const ans = monkeys[0].monkeyBusiness * monkeys[1].monkeyBusiness;
    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));

    if (process.argv.length <= 3) console.log(`Result: ${ans}`);
    return ans;
};

if (process.argv.length <= 3) void main();
export default main;
