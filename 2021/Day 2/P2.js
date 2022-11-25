const fs = require(`fs`);
const path = require(`path`);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), (err, data) => {
        if (err) throw err;

        const steps = data.toString(`utf-8`).split(`\n`);
        steps.pop();

        const pos = {
            x: 0,
            y: 0,
            z: 0
        };

        for (const step of steps) {
            const tmpStepFormation = step.split(` `);
            const stepFormation = {
                type: tmpStepFormation[0],
                amt: parseInt(tmpStepFormation[1])
            };

            if (stepFormation.type === `forward`) {
                pos.x += stepFormation.amt;
                pos.y += pos.z * stepFormation.amt;
            } else if (stepFormation.type === `up`) pos.z -= stepFormation.amt;
            else if (stepFormation.type === `down`) pos.z += stepFormation.amt;
        }

        console.log(`Result: ${pos.x * pos.y}`);
    });
};

void main();
