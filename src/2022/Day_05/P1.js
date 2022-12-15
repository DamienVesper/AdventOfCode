const fs = require(`fs`);
const path = require(`path`);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const steps = data.split(`\n\n`)[1].split(`\n`).map(x => x.trim().split(/\s/g).filter(x => !isNaN(parseInt(x))).map(x => parseInt(x)));

        const rCrates = data.split(`\n\n`)[0].split(`\n`).slice(0, -1).map(x => x.replace(/\s{4}/g, `-`).replace(/\s|\[|]/g, ``).split(``));
        const crates = new Array(rCrates[0].length).fill([]);

        for (let i = 0; i < rCrates[0].length; i++) {
            const newArr = [];
            for (let j = 0; j < rCrates.length; j++) {
                newArr.push(rCrates[j][i]);
                crates[i] = newArr.filter(x => x !== `-`).reverse();
            }
        }

        for (const step of steps) {
            const [quantity, pos1, pos2] = step;
            for (let i = 0; i < quantity; i++) crates[pos2 - 1].push(crates[pos1 - 1].pop());
        }

        const ans = crates.map(x => x.pop()).join(``);

        console.log(`Result: ${ans}`);
        fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));
    });
};

void main();
