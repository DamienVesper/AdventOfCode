const fs = require(`fs`);
const path = require(`path`);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        let ans = 0;

        const lines = data.split(`\n`);
        for (const line of lines) {}

        console.log(`Result: ${ans}`);
        fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));
    });
};

void main();
