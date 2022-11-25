const fs = require(`fs`);
const path = require(`path`);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), (err, data) => {
        if (err) throw err;

        const elevations = data.toString(`utf-8`).split(`\n`);
        elevations.pop();

        let answerCounter = 0;
        let prevElevationSum = null;

        for (let i = 0; i < elevations.length; i++) {
            if (elevations[i + 2] == null) break;

            const currentElevationSum = parseInt(elevations[i]) + parseInt(elevations[i + 1]) + parseInt(elevations[i + 2]);

            if (prevElevationSum === null) {
                prevElevationSum = parseInt(currentElevationSum);
                continue;
            } else if (parseInt(currentElevationSum) > prevElevationSum) answerCounter++;

            prevElevationSum = parseInt(currentElevationSum);
        }

        console.log(`Result: ${answerCounter}`);
    });
};

void main();
