import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Colors } from '../constants/Colors';

interface CellProps {
    value: number | null;
    isInitial: boolean;
    isSelected: boolean;
    isRelated: boolean;
    isError: boolean;
    onPress: () => void;
}

export const Cell: React.FC<CellProps> = ({ value, isInitial, isSelected, isRelated, isError, onPress }) => {
    return (
        <TouchableOpacity
            style={[
                styles.cell,
                isRelated && styles.relatedCell,
                isSelected && styles.selectedCell,
                isError && styles.errorCell,
            ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text
                style={[
                    styles.text,
                    isInitial ? styles.initialText : styles.userText,
                    isSelected && styles.selectedText,
                    isError && styles.errorText,
                ]}
            >
                {value}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: Colors.border,
        backgroundColor: Colors.surface,
    },
    relatedCell: {
        backgroundColor: Colors.related,
    },
    selectedCell: {
        backgroundColor: Colors.highlight,
    },
    errorCell: {
        backgroundColor: '#FADBD8',
    },
    text: {
        fontSize: 20,
        fontFamily: 'System', // Use system font for now, can be customized
    },
    initialText: {
        fontWeight: 'bold',
        color: Colors.fixedText,
    },
    userText: {
        color: Colors.filledText,
    },
    selectedText: {
        // color: Colors.primary,
    },
    errorText: {
        color: Colors.error,
    },
});
