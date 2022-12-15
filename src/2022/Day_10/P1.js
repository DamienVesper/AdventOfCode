const fs = require(`fs`);
const path = require(`path`);

let cycle = 0;
let x = 1;

const strengths = [];

const doCycle = () => {
    cycle++;
    if ([20, 60, 100, 140, 180, 220].includes(cycle)) strengths.push(x * cycle);
};

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const lines = data.split(`\n`).map(x => x.trim()).map(x => {
            const data = x.split(` `);
            return [data[0], parseInt(data[1])] 
        });


        for (let i = 1; i <= lines.length; i++) {
            const line = lines[i - 1];
            const [action, magnitude] = line;

            if (action === `addx`) {
                doCycle();
                doCycle();
                x += magnitude;
            } else doCycle();
        }

        const ans = strengths.reduce((a, b) => a + b);

        console.log(`Result: ${ans}`);
        fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));
    });
};

void main();
