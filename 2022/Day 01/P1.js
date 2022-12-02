const fs = require(`fs`);
const path = require(`path`);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const lines = data.split(`\n\r`).map(x => x.trim());
        let ans = 0;

        for (const line of lines) {
            const cals = line.split(`\n`).map(x => parseInt(x.trim()));
            ans = Math.max(ans, cals.reduce((a, b) => a + b));
        }

        console.log(`Result: ${ans}`);
        fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));
    });
};

void main();
