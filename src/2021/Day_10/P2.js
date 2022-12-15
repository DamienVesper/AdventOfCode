const fs = require(`fs`);
const path = require(`path`);

const pts = {
    [`)`]: 1,
    [`]`]: 2,
    [`}`]: 3,
    [`>`]: 4
};

const pairs = {
    [`(`]: `)`,
    [`[`]: `]`,
    [`{`]: `}`,
    [`<`]: `>`
};

const openings = Object.keys(pairs);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const lines = data.split(`\n`).map(x => x.trim());
        const totals = [];

        for (const line of lines) {
            let total = 0;

            const opened = [];
            const tokens = line.split(``);

            let isCorrupted = false;
            for (const token of tokens) {
                if (openings.includes(token)) opened.push(token);
                else if (pairs[opened.pop()] !== token) {
                    isCorrupted = true;
                    break;
                }
            }

            if (isCorrupted) continue;

            for (const token of opened.reverse()) {
                total *= 5;
                total += pts[pairs[token]];
            }

            totals.push(total);
        }

        const total = totals.sort((a, b) => a - b)[Math.floor(totals.length / 2)];
        console.log(`Result: ${total}`);
    });
};

void main();
