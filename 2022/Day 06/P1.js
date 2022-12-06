const fs = require(`fs`);
const path = require(`path`);

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        let ans = 0;
        let store = data.slice(0, 4).split(``);

        for (let i = 4; i < data.length; i++) {
            const newStore = [];
            let pass = true;

            for (const item of store) {
                if (newStore.includes(item)) {
                    pass = false;
                    break;
                }
                newStore.push(item);
            }

            if (pass) {
                ans = i;
                break;
            } else {
                store.shift();
                store.push(data[i])
            }
        }

        console.log(`Result: ${ans}`);
        fs.writeFileSync(path.resolve(__dirname, `./output.txt`), String(ans));
    });
};

void main();
