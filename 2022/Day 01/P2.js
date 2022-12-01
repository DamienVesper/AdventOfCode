const fs = require(`fs`);
const path = require(`path`);

// line.split(/\s+/).map(x => parseInt(x)));
const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        let ans = 0;

        const lines = data.split(`\n\r`).map(x => x.trim());

        totals = [];
        for (const line of lines) {
            cals = line.split(`\n`).map(x => parseInt(x.trim()));

            totals.push(cals.reduce((a, b) => a + b));
        }

        totals.sort((a, b) => a - b).reverse();

        console.log(`Result: ${totals[0] + totals[1] + totals[2]}`);
        fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));
    });
};

void main();
