import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { TOP_COLORS, SPACING, LAYOUT, TYPOGRAPHY } from '../config/theme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
    leftComponent?: React.ReactNode;
    rightComponent?: React.ReactNode;
}

export const Input = ({ label, error, containerStyle, leftComponent, rightComponent, ...props }: InputProps) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputContainer, error && styles.inputError]}>
                {leftComponent && <View style={styles.leftComponent}>{leftComponent}</View>}
                <TextInput
                    style={styles.input}
                    placeholderTextColor={TOP_COLORS.textSecondary}
                    selectionColor={TOP_COLORS.primary}
                    {...props}
                />
                {rightComponent && <View style={styles.rightComponent}>{rightComponent}</View>}
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.m,
        width: '100%',
    },
    label: {
        ...TYPOGRAPHY.caption,
        color: TOP_COLORS.text,
        marginBottom: SPACING.xs,
        marginLeft: SPACING.xs,
        fontWeight: '600',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: TOP_COLORS.surfaceHighlight,
        borderRadius: LAYOUT.borderRadius.m,
        borderWidth: 1,
        borderColor: 'transparent',
        overflow: 'hidden',
    },
    input: {
        flex: 1,
        paddingHorizontal: SPACING.m,
        color: TOP_COLORS.text,
        fontSize: 16,
        height: 56, // Fixed height for consistency
    },
    leftComponent: {
        paddingLeft: SPACING.m,
        justifyContent: 'center',
    },
    rightComponent: {
        paddingRight: SPACING.m,
        justifyContent: 'center',
    },
    inputError: {
        borderColor: TOP_COLORS.accent,
    },
    error: {
        color: TOP_COLORS.accent,
        fontSize: 12,
        marginTop: SPACING.xs,
        marginLeft: SPACING.xs,
    },
});
