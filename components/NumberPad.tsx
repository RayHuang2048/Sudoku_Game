import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

interface NumberPadProps {
    onNumberPress: (num: number) => void;
    onDelete: () => void;
}

export const NumberPad: React.FC<NumberPadProps> = ({ onNumberPress, onDelete }) => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {numbers.slice(0, 5).map((num) => (
                    <TouchableOpacity
                        key={num}
                        style={styles.button}
                        onPress={() => onNumberPress(num)}
                    >
                        <Text style={styles.text}>{num}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.row}>
                {numbers.slice(5).map((num) => (
                    <TouchableOpacity
                        key={num}
                        style={styles.button}
                        onPress={() => onNumberPress(num)}
                    >
                        <Text style={styles.text}>{num}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onDelete}>
                    <Text style={[styles.text, styles.deleteText]}>Del</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: 30,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    deleteButton: {
        backgroundColor: '#FADBD8',
    },
    text: {
        fontSize: 24,
        color: Colors.primary,
        fontWeight: '600',
    },
    deleteText: {
        color: Colors.error,
        fontSize: 18,
    },
});
