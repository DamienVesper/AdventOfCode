const fs = require(`fs`);
const path = require(`path`);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const lines = data.split(`\n`).map(x => x.trim());
        let ans = 0;

        const aS = `ABC`.split(``);
        const bS = `XYZ`.split(``);

        for (const line of lines) {
            const [a, b] = line.split(` `).map(x => x.trim());

            const won = 
            (a === `C` && b === `X`) ||
            (a === `A` && b === `Y`) ||
            (a === `B` && b === `Z`);

            const draw = aS.indexOf(a) === bS.indexOf(b);

            if (won) ans += 6;
            else if (draw) ans += 3;

            if (b === `X`) ans += 1;
            else if (b === `Y`) ans += 2;
            else ans += 3;
        }

        console.log(`Result: ${ans}`);
        fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));
    });
};

void main();
