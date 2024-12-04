/**
 * Create a grid of dimensions X:Y.
 * @param x The number of rows.
 * @param y The number of columns.
 * @param a The data to fill the grid with.
 * @returns The grid.
 */
export const createGrid = (x: number, y: number, a: number): number[] => {
    const grid = new Array(y);
    for (let i = 0; i < grid.length; i++) {
        grid[i] = [];
        const row = grid[i];

        for (let j = 0; j <= x; j++) row.push(a ?? 0);
    }

    return grid;
};

/**
 * Functions to solve for a word search.
 */
export const searchForWord = (grid: string[][], str: string, x: number, y: number, vx: number, vy: number): boolean => {
    if (
        x + (str.length - 1) * vx >= grid[0].length
        || x + (str.length - 1) * vx < 0
        || y + (str.length - 1) * vy >= grid.length
        || y + (str.length - 1) * vy < 0
    ) return false;

    for (let k = 0; k < str.length; k++) if (grid[y + (vy * k)][x + (vx * k)] !== str[k]) return false;
    return true;
};
