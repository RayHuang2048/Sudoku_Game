import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, Alert, Text, BackHandler } from 'react-native';
import { Board } from '@/components/Board';
import { NumberPad } from '@/components/NumberPad';
import { Controls } from '@/components/Controls';
import { ConfettiAnimation } from '@/components/ConfettiAnimation';
import { generateSudoku, Grid } from '@/utils/sudoku';
import { Colors } from '@/constants/Colors';
import { initializeSound, playClickSound, cleanupSound } from '@/utils/sound';

export default function SudokuGame() {
  const [grid, setGrid] = useState<Grid>([]);
  const [initialGrid, setInitialGrid] = useState<Grid>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [solvedGrid, setSolvedGrid] = useState<Grid>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const startNewGame = useCallback(() => {
    const { initialGrid: newInitial, solvedGrid: newSolved } = generateSudoku('medium');
    // Deep copy for the playable grid
    const newGrid = newInitial.map(row => [...row]);
    setInitialGrid(newInitial);
    setGrid(newGrid);
    setSolvedGrid(newSolved);
    setSelectedCell(null);
    setShowConfetti(false);
  }, []);

  useEffect(() => {
    startNewGame();
    // 初始化音效
    initializeSound();
    
    // 清理音效資源
    return () => {
      cleanupSound();
    };
  }, [startNewGame]);

  const handleCellPress = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  const handleNumberPress = (num: number) => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;

    // Cannot edit initial cells
    if (initialGrid[row][col] !== null) return;

    // 播放點擊音效
    playClickSound();

    const newGrid = [...grid];
    newGrid[row] = [...newGrid[row]];
    newGrid[row][col] = num;
    setGrid(newGrid);

    checkCompletion(newGrid);
  };

  const handleDelete = () => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;

    if (initialGrid[row][col] !== null) return;

    const newGrid = [...grid];
    newGrid[row] = [...newGrid[row]];
    newGrid[row][col] = null;
    setGrid(newGrid);
  };

  const handleReset = () => {
    const resetGrid = initialGrid.map(row => [...row]);
    setGrid(resetGrid);
  };

  const handleExit = () => {
    Alert.alert('Exit Game', 'Are you sure you want to exit?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Exit', onPress: () => BackHandler.exitApp() },
    ]);
  };

  const checkCompletion = (currentGrid: Grid) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (currentGrid[i][j] === null || currentGrid[i][j] !== solvedGrid[i][j]) {
          return;
        }
      }
    }
    // 觸發拉炮動畫
    setShowConfetti(true);
    // 延遲顯示恭喜訊息，讓動畫先播放
    setTimeout(() => {
      Alert.alert('恭喜！', '您成功解開了數獨！', [
        { text: '新遊戲', onPress: startNewGame },
      ]);
    }, 500);
  };

  if (grid.length === 0) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sudoku</Text>
      </View>
      <View style={styles.gameContainer}>
        <Board
          grid={grid}
          initialGrid={initialGrid}
          solvedGrid={solvedGrid}
          selectedCell={selectedCell}
          onCellPress={handleCellPress}
        />
        <Controls onNewGame={startNewGame} onReset={handleReset} onExit={handleExit} />
        <NumberPad onNumberPress={handleNumberPress} onDelete={handleDelete} />
      </View>
      <ConfettiAnimation 
        visible={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    fontFamily: 'serif', // Adds a bit of premium feel
  },
  gameContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});
