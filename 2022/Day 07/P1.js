const fs = require(`fs`);
const path = require(`path`);

const expand = path => {
    if (path === `/`) return [`/`];

    const parts = path.split(`/`);
    const expanded = [`/`];

    for (let i = 1; i < parts.length; i++) expanded.push(`${parts.slice(0, i + 1).join(`/`)}`);
    return expanded;
}

const main = async () => {
    let tree = {};
    let curPath = `/`;

    const parseCommand = line => {
        const args = line.split(/\s/g);
        const command = args.shift();

        if (command === `cd`) {
            const path = args[0];

            if (path.startsWith(`/`)) curPath = path;
            else if (path.startsWith(`..`)) {
                const parts = curPath.split(`/`);
                parts.pop();

                curPath = parts.join(`/`);
                if (curPath === ``) curPath = `/`;
            } else {
                if (curPath[curPath.length - 1] === `/`) curPath += path;
                else curPath += `/${path}`;
            }

            if (tree[curPath] === undefined) tree[curPath] = 0;
        }
    };

    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const lines = data.split(`\n`);
        
        for (const line of lines) if (line.startsWith(`$`)) parseCommand(line.slice(2));
        for (const line of lines) {
            if (line.startsWith(`$`)) parseCommand(line.slice(2));
            else {
                const rSize = line.split(/\s/g)[0];
                if (rSize !== `dir`) {
                    const size = parseInt(rSize); 
                    const dirs = expand(curPath);

                    for (const dir of dirs) tree[dir] += size;
                }
            }
        }

        const ans = Object.values(tree).filter(x => x <= 1e5).reduce((a, b) => a + b);

        console.log(`Result: ${ans}`);
        fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));
    });
};

void main();
