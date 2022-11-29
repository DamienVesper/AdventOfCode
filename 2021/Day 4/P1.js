const path = require(`path`);
const fs = require(`fs`);

class Bingo {
    constructor () {
        this.called = [];
        this.boards = [];

        this.winners = [];
    }

    callNum = (num) => {
        this.called.push(num);
        for (const board of [...this.boards.values()]) {
            board.apply(num);
            if (board.bingo) this.winners.push(board);
        }

        if (this.winners.length > 0) {
            this.calculateWinner();
            return true;
        } else return false;
    };

    calculateWinner = () => {
        const board = this.winners[0];
        const result = board.unpicked.reduce((a, b) => a + b) * this.called[this.called.length - 1];

        console.log(`Result: ${result}`);
    };
}

class Board {
    constructor (data) {
        this.data = data;
        this.bingo = false;

        this.called = [];
        this.unpicked = new Array().concat(...this.data);
    }

    lookup = (num) => {
        const nums = new Array().concat(...this.data);
        if (!nums.includes(num)) return undefined;

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (this.data[i][j] === num) return [i, j];
            }
        }
    }

    apply = (num) => {
        if (this.unpicked.includes(num)) this.unpicked = this.unpicked.filter(x => x !== num);
        this.called.push(num);

        const arrRows = [
            new Array(5).fill(0),
            new Array(5).fill(0),
            new Array(5).fill(0),
            new Array(5).fill(0),
            new Array(5).fill(0)
        ];

        const arrCols = [
            new Array(5).fill(0),
            new Array(5).fill(0),
            new Array(5).fill(0),
            new Array(5).fill(0),
            new Array(5).fill(0)
        ];


        for (const calledNum of this.called) {
            const pos = this.lookup(calledNum);
            if (pos === undefined) continue;

            const [y, x] = pos;

            arrRows[y][x] = 1;
            arrCols[x][y] = 1;
        }

        for (const row of arrRows) {
            if (row.filter(x => x === 1).length === 5) {
                this.bingo = true;
                break;
            }
        }

        for (const col of arrCols) {
            if (col.filter(x => x === 1).length === 5) {
                this.bingo = true;
                break;
            }
        }
    };
}

const main = async () => {
    fs.readFile(path.resolve(__dirname, `./input.txt`), `utf-8`, (err, data) => {
        if (err) throw err;

        const lines = data.split(`\n`).map(x => x.trim());
        const calledNums = lines.shift().trim().split(`,`).map(x => parseInt(x));

        const bingo = new Bingo();

        lines.shift();
        lines.push(``);

        let tempBoard = [];
        for (const line of lines) {
            if (line === ``) {
                bingo.boards.push(new Board(tempBoard));
                tempBoard = [];
            } else tempBoard.push(line.split(/\s+/).map(x => parseInt(x)));
        }
        
        for (const num of calledNums) {
            const call = bingo.callNum(num);
            if (call) break;
        }
    });
};

void main();
