const fs = require(`fs`);
const path = require(`path`);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const lines = data.split(`\n`).map(x => x.trim());
        let ans = 0;

        for (const line of lines) {
            const [a, b] = line.split(` `).map(x => x.trim());

            const won = b === `Z`;
            const draw = b === `Y`;

            let c = ``;
            if (draw) c = [`X`, `Y`, `Z`][[`A`, `B`, `C`].indexOf(a)];
            else {
                if (a === `A`) c = won ? `Y` : `Z`
                else if (a === `B`) c = won ? `Z` : `X`
                else c = won ? `X` : `Y`;
            }

            if (won) ans += 6;
            else if (draw) ans += 3;

            if (c === `X`) ans += 1;
            else if (c === `Y`) ans += 2;
            else ans += 3;
        }

        console.log(`Result: ${ans}`);
        fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));
    });
};

void main();
