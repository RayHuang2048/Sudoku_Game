export type Grid = (number | null)[][];

const BLANK = null;

export const generateSudoku = (difficulty: 'easy' | 'medium' | 'hard' = 'medium'): { initialGrid: Grid, solvedGrid: Grid } => {
    const solvedGrid = createSolvedGrid();
    const initialGrid = removeNumbers([...solvedGrid.map(row => [...row])], difficulty);
    return { initialGrid, solvedGrid };
};

const createSolvedGrid = (): Grid => {
    const grid: Grid = Array.from({ length: 9 }, () => Array(9).fill(BLANK));
    fillGrid(grid);
    return grid;
};

const fillGrid = (grid: Grid): boolean => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === BLANK) {
                const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                for (const num of nums) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (fillGrid(grid)) return true;
                        grid[row][col] = BLANK;
                    }
                }
                return false;
            }
        }
    }
    return true;
};

export const isValid = (grid: Grid, row: number, col: number, num: number): boolean => {
    // Check row
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num && x !== col) return false;
    }

    // Check col
    for (let x = 0; x < 9; x++) {
        if (grid[x][col] === num && x !== row) return false;
    }

    // Check 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[startRow + i][startCol + j] === num && (startRow + i !== row || startCol + j !== col)) {
                return false;
            }
        }
    }

    return true;
};

const removeNumbers = (grid: Grid, difficulty: 'easy' | 'medium' | 'hard'): Grid => {
    let attempts = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 45 : 55;
    while (attempts > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        while (grid[row][col] === BLANK) {
            row = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);
        }
        grid[row][col] = BLANK;
        attempts--;
    }
    return grid;
};

const shuffle = (array: number[]): number[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
