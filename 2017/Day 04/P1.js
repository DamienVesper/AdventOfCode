const fs = require(`fs`);
const path = require(`path`);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        let ans = 0;

        const lines = data.split(`\n`).map(x => x.trim());
        for (const line of lines) {
            const parts = line.split(` `);

            let duplicates = false;

            let seen = [];
            for (const part of parts) {
                if (seen.includes(part)) {
                    duplicates = true;
                    break;
                } else seen.push(part);
            }

            if (!duplicates) ans++;
        }

        console.log(`Result: ${ans}`);
        fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));
    });
};

void main();
