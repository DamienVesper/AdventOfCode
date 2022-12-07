const fs = require(`fs`);
const path = require(`path`);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const lines = data.split(`\n`).map(x => x.trim());

        let ans = 0;

        for (const line of lines) {
            const output = line.split(` | `)[1].split(` `);

            for (const item of output) {
                if (
                    (item.length === 2) ||
                    (item.length === 3) ||
                    (item.length === 4) ||
                    (item.length === 7)
                ) ans++;
            }
        }

        console.log(`Result: ${ans}`);
    });
};

void main();
