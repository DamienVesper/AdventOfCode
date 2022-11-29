const path = require(`path`);
const fs = require(`fs`);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const lines = data.split(`,`).map(x => parseInt(x.trim()));
        const arr = new Array(9).fill(0);
        lines.map(x => arr[x]++);

        for (let i = 0; i < 256; i++) {
            const cp0 = arr[0];
            const cp1 = arr[1];
            const cp2 = arr[2];
            const cp3 = arr[3];
            const cp4 = arr[4];
            const cp5 = arr[5];
            const cp6 = arr[6];
            const cp7 = arr[7];
            const cp8 = arr[8];

            arr[0] = cp1;
            arr[1] = cp2;
            arr[2] = cp3;
            arr[3] = cp4;
            arr[4] = cp5;
            arr[5] = cp6;
            arr[6] = cp7 + cp0;
            arr[7] = cp8;
            arr[8] = cp0;
        }

        const total = arr.reduce((a, b) => a + b);
        console.log(`Result: ${total}`);
    });
};

void main();
