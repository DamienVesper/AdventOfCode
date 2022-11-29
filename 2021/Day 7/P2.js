const fs = require(`fs`);
const path = require(`path`);

const calcFuel = steps => {
    let total = 0;
    for (let i = 1; i <= steps; i++) total += i;

    return total;
};

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;
        
        const crabs = data.split(`,`).map(c => Number(c));
        let ans = 0;

        for (let i = Math.min(...crabs); i <= Math.max(...crabs); i++) {
            let res = 0;

            for (const crab of crabs) res += calcFuel(Math.abs(crab - i));
            ans = ans === 0 ? res : Math.min(res, ans);
        }

        console.log(`Result: ${ans}`);
    });
};

void main();
