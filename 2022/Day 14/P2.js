const fs = require(`fs`);
const path = require(`path`);

fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
    if (err) throw err;

    const lines = data.split(`\n`).map(x => x.trim()).map(x => x.split(` -> `).map(x => x.split(`,`).map(x => parseInt(x))));

    let xBounds = [null, null];
    let yBounds = [9, null];

    for (const line of lines) {
        const x = [null, null];
        const y = [null, null];

        for (const coord of line) {
            if (x[0] === null) { x[0] = coord[0]; x[1] = coord[0]; }
            if (y[0] === null) { y[0] = coord[1]; y[1] = coord[1]; }

            x[0] = Math.min(coord[0], x[0]);
            x[1] = Math.max(coord[0], x[1]);

            y[0] = Math.min(coord[1], y[0]);
            y[1] = Math.max(coord[1], y[1]);
        }

        if (xBounds[0] === null) xBounds = [x[0], x[1]];
        if (yBounds[1] === null) yBounds = [0, y[1]];

        xBounds[0] = Math.min(xBounds[0], x[0]);
        xBounds[1] = Math.max(xBounds[1], x[1]);
        yBounds[1] = Math.max(yBounds[1], y[1]);
    }

    xBounds[0]--;
    xBounds[0] -= 4 * xBounds[0];
    xBounds[1] *= 5;

    yBounds[0]--;
    yBounds[1] += 2;

    const grid = new Array(yBounds[1] - yBounds[0]);
    for (let i = 0; i < yBounds[1] - yBounds[0]; i++) {
        grid[i] = [];
        const row = grid[i];

        for (let j = 0; j <= xBounds[1] - xBounds[0]; j++) row.push(i === yBounds[1] ? `#` : `.`);
    }

    for (const line of lines) {
        for (let i = 0; i < line.length - 1; i++) {
            const pairs = [line[i], line[i + 1]];

            const x1 = Math.min(pairs[0][0], pairs[1][0]);
            const x2 = Math.max(pairs[0][0], pairs[1][0]);
            const y1 = Math.min(pairs[0][1], pairs[1][1]);
            const y2 = Math.max(pairs[0][1], pairs[1][1]);

            for (let j = y1; j <= y2; j++) {
                for (let k = x1; k <= x2; k++) {
                    const y = j - (yBounds[0] + 1);
                    const x = k - xBounds[0];
    
                    grid[y][x] = `#`;
                }
            }
        }
    }

    const startCoord = [500 - xBounds[0], 0];
    grid[startCoord[1]][startCoord[0]] = `+`;

    let ans = 0;
    let hasBlockedSource = false;
    while (!hasBlockedSource) {
        ans++;

        const sandPos = [startCoord[0], startCoord[1]];
        while (true) {
            if (!(sandPos[0] === startCoord[0] && sandPos[1] === startCoord[1])) grid[sandPos[1]][sandPos[0]] = `.`;


            const bottom = grid[sandPos[1] + 1][sandPos[0]]
            const bottomLeft = grid[sandPos[1] + 1][sandPos[0] - 1];
            const bottomRight = grid[sandPos[1] + 1][sandPos[0] + 1];

            if (bottom === `.`) {
                grid[sandPos[1] + 1][sandPos[0]] = `o`;
                sandPos[1]++;
            } else if (bottomLeft === `.`) {
                grid[sandPos[1] + 1][sandPos[0] - 1] = `o`;
                sandPos[0]--;
                sandPos[1]++;
            } else if (bottomRight === `.`) {
                grid[sandPos[1] + 1][sandPos[0] + 1] = `o`;
                sandPos[0]++;
                sandPos[1]++;
            } else {
                grid[sandPos[1]][sandPos[0]] = `o`;
                break;
            }
        }

        if (grid[startCoord[1]][startCoord[0]] === `o`) {
            hasBlockedSource = true;
            break;
        }
    }

    const output = grid.map(x => x.join(``)).join(`\n`);
    fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(output));

    console.log(`Result: ${ans}`);
});
