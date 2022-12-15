const fs = require(`fs`);
const path = require(`path`);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const values = data.split(`\n`);

        let gamma = ``;
        let epsilon = ``;

        const nums = [];
        for (let i = 0; i < values[0].length; i++) nums.push([]);

        for (const number of values) {
            for (let i = 0; i < number.length; i++) {
                const num = parseInt(number[i]);
                if (!isNaN(num)) nums[i].push(num);
            }
        }

        for (let i = 0; i < nums.length; i++) {
            let count0 = 0;
            let count1 = 0;

            for (let j = 0; j < nums[i].length; j++) {
                if (nums[i][j] === 0) count0++;
                else if (nums[i][j] === 1) count1++;
            }

            if (count0 > count1) {
                gamma += `0`;
                epsilon += `1`;
            } else if (count1 > count0) {
                gamma += `1`;
                epsilon += `0`;
            }
        }

        console.log(`Result: ${parseInt(gamma, 2) * parseInt(epsilon, 2)}`);
    });
};

void main();
