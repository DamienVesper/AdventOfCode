const fs = require(`fs`);
const path = require(`path`);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const elevations = data.split(`\n`);
        elevations.pop();

        let answerCounter = 0;
        let prevElevation = null;

        for (const elevation of elevations) {
            if (prevElevation === null) {
                prevElevation = parseInt(elevation);
                continue;
            } else if (parseInt(elevation) > prevElevation) answerCounter++;

            prevElevation = parseInt(elevation);
        }

        console.log(`Result: ${answerCounter}`);
    });
};

void main();
