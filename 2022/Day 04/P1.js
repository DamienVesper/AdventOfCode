const fs = require(`fs`);
const path = require(`path`);

const expand = (range) => {
    let coords = [];

    const [x1, x2] = range.split(`-`).map(x => parseInt(x));
    for (let i = x1 - 1; i <= x2 + 1; i++) coords.push(i);

    return coords.map(x => String(x));
};

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const lines = data.split(`\n`).map(x => x.trim());
        let ans = 0;

        for (const line of lines) {
            const elves = line.split(`,`);
            const a = expand(elves[0]).join(``);
            const b = expand(elves[1]).join(``);

            if (a.includes(b) || b.includes(a)) ans++;
        }

        console.log(`Result: ${ans}`);
        fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));
    });
};

void main();
