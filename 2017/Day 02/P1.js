const fs = require(`fs`);
const path = require(`path`);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        let ans = 0;

        const lines = data.split(`\n`).map(x => x.trim());
        for (const line of lines) {
            const coords = line.split(/\s+/).map(x => parseInt(x)).sort((a, b) => a - b);
            ans += (coords.pop() - coords[0]);
        }

        console.log(`Result: ${ans}`);
        fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));
    });
};

void main();
