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
            let alphabetized = [];
            for (const part of parts) {
                const alphaPart = part.split("").sort().join("");
                if (seen.includes(part)) {
                    duplicates = true;
                    break;
                } else if (alphabetized.includes(alphaPart)) {
                    duplicates = true;
                    break;
                } else {
                    seen.push(part);
                    alphabetized.push(alphaPart);
                }
            }

            if (!duplicates) ans++;
        }

        console.log(`Result: ${ans}`);
        fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));
    });
};

void main();
