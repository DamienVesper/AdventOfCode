const fs = require(`fs`);
const path = require(`path`);

const getO2Rating = (nums, index) => {
    const mostCommonBit = nums.filter(x => x.charAt(index) === `1`).length >= nums.filter(x => x.charAt(index) === `0`).length ? `1` : `0`;
    const newNums = nums.filter(x => x.charAt(index) === mostCommonBit);

    if (newNums.length > 1) return getO2Rating(newNums, index + 1);
    else return parseInt(newNums[0], 2);
};

const getCO2Rating = (nums, index) => {
    const leastCommonBit = nums.filter(x => x.charAt(index) === `0`).length <= nums.filter(x => x.charAt(index) === `1`).length ? `0` : `1`;
    const newNums = nums.filter(x => x.charAt(index) === leastCommonBit);

    if (newNums.length > 1) return getCO2Rating(newNums, index + 1);
    else return parseInt(newNums[0], 2);
};

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const nums = data.split(`\n`).map(x => x.trim());
        console.log(`Result: ${getO2Rating(nums, 0) * getCO2Rating(nums, 0)}`);
    });
};

void main();
