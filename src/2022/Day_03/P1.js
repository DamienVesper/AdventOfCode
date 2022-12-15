const fs = require(`fs`);
const path = require(`path`);

const priority = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`.split(``);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const lines = data.split(`\n`).map(x => x.trim());
        let ans = 0;

        for (const line of lines) {
            const compartments = [line.slice(0, line.length / 2), line.slice(line.length / 2)];

            const alreadyFound = compartments[0].split(``);
            let dupeItem;
            for (const item of compartments[1]) {
                if (alreadyFound.includes(item)) {
                    dupeItem = item;
                    break;
                }
            }

            ans += priority.indexOf(dupeItem) + 1;
        }

        console.log(`Result: ${ans}`);
        fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));
    });
};

void main();
