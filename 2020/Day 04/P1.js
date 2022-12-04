const fs = require(`fs`);
const path = require(`path`);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const lines = data.split(`\n\r`).map(x => x.trim());
        let ans = 0;

        for (const line of lines) {
            const fields = line.replace(`\r`, `\n`).split(`\n`).map(x => x.trim()).filter(x => x !== ``).join(` `).split(` `).map(x => x.slice(0, 3));
            if (fields.includes(`cid`)) {
                if (fields.length === 8) ans++;
            } else if (fields.length === 7) ans++;
        }

        console.log(`Result: ${ans}`);
    });
};

void main();
