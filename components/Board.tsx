import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Cell } from './Cell';
import { Colors } from '../constants/Colors';
import { Grid } from '../utils/sudoku';

interface BoardProps {
    grid: Grid;
    initialGrid: Grid;
    solvedGrid: Grid;
    selectedCell: { row: number; col: number } | null;
    onCellPress: (row: number, col: number) => void;
}

export const Board: React.FC<BoardProps> = ({ grid, initialGrid, solvedGrid, selectedCell, onCellPress }) => {
    return (
        <View style={styles.board}>
            {grid.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((cellValue, colIndex) => {
                        const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                        const isRelated =
                            selectedCell &&
                            (selectedCell.row === rowIndex ||
                                selectedCell.col === colIndex ||
                                (Math.floor(selectedCell.row / 3) === Math.floor(rowIndex / 3) &&
                                    Math.floor(selectedCell.col / 3) === Math.floor(colIndex / 3)));

                        // Check for error: if cell has a value (user filled) and it doesn't match the solved grid
                        const isError =
                            cellValue !== null &&
                            initialGrid[rowIndex][colIndex] === null && // Only check user-filled cells
                            cellValue !== solvedGrid[rowIndex][colIndex];

                        // Add thick borders for 3x3 boxes
                        const borderRightWidth = (colIndex + 1) % 3 === 0 && colIndex !== 8 ? 2 : 0.5;
                        const borderBottomWidth = (rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? 2 : 0.5;

                        return (
                            <View
                                key={`${rowIndex}-${colIndex}`}
                                style={{
                                    flex: 1,
                                    borderRightWidth,
                                    borderBottomWidth,
                                    borderColor: Colors.text, // Darker border for 3x3 sections
                                }}
                            >
                                <Cell
                                    value={cellValue}
                                    isInitial={initialGrid[rowIndex][colIndex] !== null}
                                    isSelected={!!isSelected}
                                    isRelated={!!isRelated && !isSelected}
                                    isError={isError}
                                    onPress={() => onCellPress(rowIndex, colIndex)}
                                />
                            </View>
                        );
                    })}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    board: {
        width: '100%',
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: Colors.text,
        backgroundColor: Colors.border,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
});
