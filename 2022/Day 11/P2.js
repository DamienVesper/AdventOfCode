const fs = require(`fs`);
const path = require(`path`);

fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
    if (err) throw err;

    const monkeys = data.split(`\n\r`).map(x => x.trim()).map(x => {
        const data = x.split(`\n`).map(x => x.trim());

        const items = data[1].slice(16).split(`, `).map(x => parseInt(x));
        const operation = data[2].slice(17);
        const test = parseInt(data[3].slice(19));

        const doIfTrue = parseInt(data[4].slice(25));
        const doIfFalse = parseInt(data[5].slice(26));

        let monkeyBusiness = 0;
        return { items, operation, test, doIfTrue, doIfFalse, monkeyBusiness };
    });

    let lcm = 1;
    for (const monkey of monkeys) lcm *= monkey.test;

    for (let i = 0; i < 1e4; i++) {
        for (let j = 0; j < monkeys.length; j++) {
            const monkey = monkeys[j];
            const { test, doIfTrue, doIfFalse } = monkey;

            const items = [...monkey.items];
            for (const item of items) {
                monkey.items.shift();
    
                const operation = String(monkey.operation);
                const res = eval(operation.replace(/old/g, item)) % lcm;

                if (res === Infinity) process.exit();

                const passesTest = res % test === 0;
                monkeys[passesTest ? doIfTrue : doIfFalse].items.push(res);
                monkey.monkeyBusiness++;
            }
        }
    }

    monkeys.sort((a, b) => b.monkeyBusiness - a.monkeyBusiness);

    const ans = monkeys[0].monkeyBusiness * monkeys[1].monkeyBusiness;
    console.log(`Result: ${ans}`);
});
