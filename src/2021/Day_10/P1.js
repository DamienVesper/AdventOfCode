const fs = require(`fs`);
const path = require(`path`);

const pts = {
    [`)`]: 3,
    [`]`]: 57,
    [`}`]: 1197,
    [`>`]: 25137
};

const pairs = {
    [`(`]: `)`,
    [`[`]: `]`,
    [`{`]: `}`,
    [`<`]: `>`
};

const openings = Object.keys(pairs);

const errs = {
    [`)`]: 0,
    [`]`]: 0,
    [`}`]: 0,
    [`>`]: 0
};

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const lines = data.split(`\n`).map(x => x.trim());
        for (const line of lines) {
            const opened = [];

            const tokens = line.split(``);
            for (const token of tokens) {
                if (openings.includes(token)) opened.push(token);
                else if (pairs[opened.pop()] !== token) {
                    errs[token]++;
                    break;
                }
            }
        }

        let total = 0;
        for (const [token, count] of Object.entries(errs)) total += pts[token] * count;

        console.log(`Result: ${total}`);
    });
};

void main();
