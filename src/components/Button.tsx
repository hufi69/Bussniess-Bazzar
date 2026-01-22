import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { TOP_COLORS, SPACING, TYPOGRAPHY, LAYOUT } from '../config/theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    icon?: React.ReactNode;
}

export const Button = ({ title, onPress, variant = 'primary', loading, style, textStyle, icon }: ButtonProps) => {
    const getBackgroundColor = () => {
        switch (variant) {
            case 'primary': return TOP_COLORS.primary;
            case 'secondary': return TOP_COLORS.surface;
            case 'outline': return 'transparent';
            case 'ghost': return 'transparent';
            default: return TOP_COLORS.primary;
        }
    };

    const getTextColor = () => {
        switch (variant) {
            case 'primary': return TOP_COLORS.black; // High contrast on bright green
            case 'secondary': return TOP_COLORS.text;
            case 'outline': return TOP_COLORS.primary;
            case 'ghost': return TOP_COLORS.textSecondary;
            default: return TOP_COLORS.black;
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor: getBackgroundColor() },
                variant === 'outline' && styles.outline,
                style,
            ]}
            onPress={onPress}
            disabled={loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <>
                    {icon}
                    <Text style={[styles.text, { color: getTextColor() }, icon && { marginLeft: SPACING.s }, textStyle]}>
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: SPACING.m,
        paddingHorizontal: SPACING.l,
        borderRadius: LAYOUT.borderRadius.m,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    outline: {
        borderWidth: 1.5,
        borderColor: TOP_COLORS.primary,
    },
    text: {
        ...TYPOGRAPHY.button,
        fontWeight: '700',
    },
});
