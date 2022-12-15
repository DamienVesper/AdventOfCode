const path = require(`path`);
const fs = require(`fs`);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const lines = data.split(`\n`).map(x => x.trim().split(/\s+/).map(x => parseInt(x)));
        let total = 0;

        const fData = [];
        for (let i = 0; i < lines.length; i += 3) {
            for(let j = 0; j < 3; j++) {
                fData.push([
                    lines[i][j],
                    lines[i + 1][j],
                    lines[i + 2][j]
                ]);
            }
        }

        for (const line of fData) {
            const [a, b, c] = line;

            if ((a + b > c) && (a + c > b) && (b + c > a)) total++;
        }

        console.log(`Result: ${total}`);
    });
};

void main();
