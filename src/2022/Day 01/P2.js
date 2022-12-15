const fs = require(`fs`);
const path = require(`path`);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const lines = data.split(`\n\r`).map(x => x.trim());
        let ans = 0;

        const totals = [];
        for (const line of lines) {
            const cals = line.split(`\n`).map(x => parseInt(x.trim()));
            totals.push(cals.reduce((a, b) => a + b));
        }

        totals.sort((a, b) => b - a);

        console.log(`Result: ${totals[0] + totals[1] + totals[2]}`);
        fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));
    });
};

void main();
