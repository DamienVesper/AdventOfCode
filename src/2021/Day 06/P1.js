const path = require(`path`);
const fs = require(`fs`);

class Lanternfish {
    constructor (timer) {
        this.timer = timer;
        this.children = [];
    }

    doDay = () => {
        for (const child of this.children) child.doDay();

        if (this.timer === 0) {
            this.timer = 6;
            this.children.push(new Lanternfish(8));
        } else this.timer--;
    }

    calculateTotal = () => {
        let total = 1;
        if (this.children.length > 0) for (const child of this.children) total += child.calculateTotal();
        
        return total;
    }
}

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const lines = data.split(`,`).map(x => parseInt(x.trim()));

        const fishes = [];
        for (const line of lines) fishes.push(new Lanternfish(line));

        for (let i = 0; i < 80; i++) for (const fish of fishes) fish.doDay();

        let total = 0;
        for (const fish of fishes) total += fish.calculateTotal();

        console.log(`Result: ${total}`);
    });
};

void main();
