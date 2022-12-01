const fs = require(`fs`);
const path = require(`path`);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        let ans = 0;

        const lines = data.split(`\n`).map(x => x.trim());
        for (const line of lines) {
            const coords = line.split(/\s+/).map(x => parseInt(x)).sort((a, b) => a - b).reverse();

            let found = false;
            for (let i = 0; i < coords.length; i++) {
                for (let j = 0; j < coords.length; j++) {
                    if (coords[i] % coords[j] === 0 && coords[i] !== coords[j]) {
                        found = true;
                        ans += coords[i] / coords[j];
                        break;
                    }
                }

                if (found) break;
            }
        }

        console.log(`Result: ${ans}`);
        fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));
    });
};

void main();
