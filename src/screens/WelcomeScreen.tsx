import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ShieldCheck } from 'lucide-react-native';
import { Button } from '../components/Button';
import { TOP_COLORS, SPACING, TYPOGRAPHY } from '../config/theme';

export const WelcomeScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={TOP_COLORS.background} />

            {/* Top Bar */}
            <View style={styles.topBar}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoIcon}>
                        <ShieldCheck size={20} color={TOP_COLORS.black} />
                    </View>
                    <Text style={styles.logoText}>BazaarShield</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {/* Visual Area */}
                <View style={[styles.illustration, styles.glowContainer]}>
                    <ShieldCheck
                        size={120}
                        color={TOP_COLORS.primary}
                        style={{ shadowColor: TOP_COLORS.primary, shadowRadius: 20, shadowOpacity: 0.5 }}
                    />
                    {/* Decorative blurred circles behind for "cyber-organic" feel */}
                    <View style={styles.decorativeCircle} />
                </View>

                {/* Text Content */}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>
                        Shop with Confidence{'\n'}on Social Media
                    </Text>
                    <Text style={styles.subtitle}>
                        BazaarShield holds your payment in a secure escrow until you verify the delivery. No more scams, just safe shopping.
                    </Text>

                    {/* Indicators */}
                    <View style={styles.indicators}>
                        <View style={[styles.dot, styles.activeDot]} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>
                </View>

                {/* Actions */}
                <View style={styles.actions}>
                    <Button
                        title="Get Started"
                        onPress={() => navigation.navigate('Signup')}
                        style={styles.mainButton}
                    />
                    <View style={styles.loginRow}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.loginLink}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: TOP_COLORS.background,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.l,
        paddingTop: SPACING.m,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoIcon: {
        backgroundColor: TOP_COLORS.primary,
        padding: 4,
        borderRadius: 6,
        marginRight: SPACING.s,
    },
    logoText: {
        color: TOP_COLORS.white,
        fontWeight: '700',
        fontSize: 16,
    },
    skipText: {
        color: TOP_COLORS.textSecondary,
        fontSize: 14,
    },
    content: {
        flex: 1,
        padding: SPACING.l,
        justifyContent: 'space-between',
    },
    illustration: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    glowContainer: {
        position: 'relative',
    },
    decorativeCircle: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: TOP_COLORS.primary,
        opacity: 0.1,
        zIndex: -1,
        transform: [{ scale: 1.2 }],
    },
    textContainer: {
        marginBottom: SPACING.xl,
        alignItems: 'center',
    },
    title: {
        ...TYPOGRAPHY.h1,
        textAlign: 'center',
        marginBottom: SPACING.m,
    },
    subtitle: {
        ...TYPOGRAPHY.body,
        textAlign: 'center',
        marginBottom: SPACING.xl,
        paddingHorizontal: SPACING.m,
    },
    indicators: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: TOP_COLORS.surfaceHighlight,
    },
    activeDot: {
        backgroundColor: TOP_COLORS.primary,
        width: 24,
    },
    actions: {
        marginBottom: SPACING.m,
    },
    mainButton: {
        marginBottom: SPACING.l,
        shadowColor: TOP_COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
    },
    loginRow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginText: {
        color: TOP_COLORS.textSecondary,
        fontSize: 14,
    },
    loginLink: {
        color: TOP_COLORS.primary,
        fontWeight: '700',
        fontSize: 14,
    },
});
