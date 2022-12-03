const fs = require(`fs`);
const path = require(`path`);

const priority = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`.split(``);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const lines = data.split(`\n`).map(x => x.trim());
        let ans = 0;

        for (let i = 0; i < lines.length; i += 3) {
            const group = lines.slice(i, i + 3);

            let commonToken;
            for (const token of group[0]) {
                if (group.every(x => x.includes(token))) {
                    commonToken = token;
                    break;
                }
            }

            ans += priority.indexOf(commonToken) + 1
        }

        console.log(`Result: ${ans}`);
        fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));
    });
};

void main();
