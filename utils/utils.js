/**
 * Create a grid of dimensions X:Y.
 * @param {number} x The number of rows.
 * @param {number} y The number of columns.
 * @param {number} a The data to fill the grid with.
 * @returns The grid.
 */
const createGrid = (x, y) => {
    const grid = new Array(y);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = [];
        const row = grid[i];

        for (let j = 0; j <= x; j++) row.push(a ?? 0);
    }

    return grid;
};

export {
    createGrid
}
