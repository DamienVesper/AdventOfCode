const fs = require(`fs`);
const path = require(`path`);

const getAllPoints = (line) => {
    const newLine = line.split(` -> `).map(x => x.trim());
    const [x1, y1] = newLine[0].split(`,`);
    const [x2, y2] = newLine[1].split(`,`);

    const a = parseInt(x1) === parseInt(x2)
        ? 0
        : parseInt(y1) === parseInt(y2)
            ? 1
            : 2;

    const points = [];

    const dispX = parseInt(x2 - x1);
    const dispY = parseInt(y2 - y1);

    const displacement = (a === 0 || a === 2) ? dispY : dispX;
    const steps = Math.abs(displacement);

    for (let i = 0; i <= steps; i++) points.push(`${parseInt(x1) + (a === 1 || a === 2 ? (i * (dispX > 0 ? 1 : -1)) : 0)}:${parseInt(y1) + (a === 0 || a === 2 ? (i * (dispY > 0 ? 1 : -1)) : 0)}`);
    return points;
};

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const lines = data.split(`\n`);

        const formattedLines = [];
        for (const line of lines) {
            const newLine = line.split(` -> `).map(x => x.trim());
            const [x1, y1] = newLine[0].split(`,`);
            const [x2, y2] = newLine[1].split(`,`);

            if (parseInt(x1) === parseInt(x2) || parseInt(y1) === parseInt(y2) || (Math.abs(y2 - y1) === Math.abs(x2 - x1))) formattedLines.push(line);
        }

        const rawPoints = [];
        for (const line of formattedLines) {
            const points = getAllPoints(line);
            for (const point of points) rawPoints.push(point);
        }

        let totalOverlaps = 0;
        const alreadyCounted = [];
        const alreadyPointed = [];
        for (const point of rawPoints) {
            if (alreadyCounted.includes(point) && !alreadyPointed.includes(point)) {
                alreadyPointed.push(point);
                totalOverlaps++;
            }
            alreadyCounted.push(point);
        }

        console.log(`Result: ${totalOverlaps}`);
    });
};

void main();
