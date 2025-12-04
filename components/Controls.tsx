import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

interface ControlsProps {
    onNewGame: () => void;
    onReset: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ onNewGame, onReset }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onNewGame}>
                <Text style={styles.text}>New Game</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={onReset}>
                <Text style={[styles.text, styles.resetText]}>Reset</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
        paddingBottom: 20,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: Colors.primary,
        borderRadius: 25,
        elevation: 3,
    },
    resetButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.primary,
        elevation: 0,
    },
    text: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resetText: {
        color: Colors.primary,
    },
});
