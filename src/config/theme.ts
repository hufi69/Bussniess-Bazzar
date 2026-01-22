import { ViewStyle, TextStyle } from 'react-native';

// "Cyber-Organic" Aesthetic as per .agents/skills/frontend-design
// High contrast, neon accents, deep rich backgrounds, playful but refined typography.

export const TOP_COLORS = {
    primary: '#00F0FF', // Cyber Cyan - Distinctive, electric
    primaryDark: '#00B8C4',
    secondary: '#7000FF', // Electric Violet - Gradient potential
    background: '#050505', // Void Black - Infinite depth
    surface: '#111111', // Matte Surface
    surfaceHighlight: '#1A1A1A',
    text: '#EAEAEA', // Off-white for less eye strain
    textSecondary: '#888888',
    border: '#222222',
    accent: '#FF0055', // Radical Red for errors/alerts
    success: '#00FF9D', // Spring Green
    white: '#FFFFFF',
    black: '#000000',
    overlay: 'rgba(0,0,0,0.85)',
};

export const SPACING = {
    xs: 8,
    s: 16,
    m: 24,
    l: 32,
    xl: 48,
    xxl: 64,
};

export const TYPOGRAPHY = {
    h1: {
        fontSize: 36,
        fontWeight: '800' as TextStyle['fontWeight'],
        color: TOP_COLORS.text,
        letterSpacing: -1.5,
        lineHeight: 40,
        // In a real web app we'd use a custom font family here like 'Space Grotesk' or 'Syne'
    },
    h2: {
        fontSize: 24,
        fontWeight: '700' as TextStyle['fontWeight'],
        color: TOP_COLORS.text,
        letterSpacing: -0.5,
    },
    body: {
        fontSize: 16,
        color: TOP_COLORS.textSecondary,
        lineHeight: 26,
        letterSpacing: 0.2,
    },
    caption: {
        fontSize: 12,
        color: TOP_COLORS.textSecondary,
        textTransform: 'uppercase' as TextStyle['textTransform'],
        letterSpacing: 1.5,
        fontWeight: '700' as TextStyle['fontWeight'],
    },
    button: {
        fontSize: 16,
        fontWeight: '700' as TextStyle['fontWeight'],
        color: TOP_COLORS.black,
        letterSpacing: 0.5,
    },
};

export const LAYOUT = {
    borderRadius: {
        s: 4,
        m: 16, // Super rounded or harsh square? Let's go rounded for organic feel
        l: 32,
        xl: 999, // Pill shape
    },
    shadows: {
        glow: {
            shadowColor: TOP_COLORS.primary,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.6,
            shadowRadius: 20,
            elevation: 10,
        }
    }
};
