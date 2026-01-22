import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft, ShieldCheck } from 'lucide-react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { TOP_COLORS, SPACING, TYPOGRAPHY, LAYOUT } from '../config/theme';
import { useVerifyOTP } from '../hooks/auth/useAuth';

export const VerifyOTPScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { userId, email } = route.params;
    const [otp, setOtp] = useState('');
    const { mutate: verifyOTP, isPending } = useVerifyOTP();

    const handleVerify = () => {
        if (otp.length !== 6) {
            Alert.alert('Error', 'Please enter a valid 6-digit code');
            return;
        }

        verifyOTP(
            { userId, otp },
            {
                onSuccess: (data) => {
                    Alert.alert('Success', 'Email verified successfully');
                    navigation.navigate('Home');
                },
                onError: (error: any) => {
                    Alert.alert('Error', error?.response?.data?.message || 'Verification failed');
                },
            }
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <View style={styles.content}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeft color={TOP_COLORS.white} size={24} />
                    </TouchableOpacity>

                    <View style={styles.imageContainer}>
                        <View style={styles.iconCircle}>
                            <ShieldCheck size={48} color={TOP_COLORS.primary} />
                        </View>
                    </View>

                    <Text style={styles.title}>Verify Email</Text>
                    <Text style={styles.subtitle}>
                        We've sent a 6-digit verification code to {email}.
                    </Text>

                    <Input
                        label="Verification Code"
                        placeholder="000000"
                        value={otp}
                        onChangeText={setOtp}
                        keyboardType="number-pad"
                        maxLength={6}
                        containerStyle={styles.inputSpacing}
                    />

                    <Button
                        title="Verify"
                        onPress={handleVerify}
                        loading={isPending}
                        style={styles.mainButton}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: TOP_COLORS.background,
    },
    content: {
        padding: SPACING.l,
        flex: 1,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: SPACING.xl,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: SPACING.l,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: TOP_COLORS.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: TOP_COLORS.primary,
        elevation: 5,
    },
    title: {
        ...TYPOGRAPHY.h1,
        fontSize: 26,
        marginBottom: SPACING.xs,
    },
    subtitle: {
        ...TYPOGRAPHY.body,
        fontSize: 15,
        marginBottom: SPACING.xl,
        color: TOP_COLORS.textSecondary,
        lineHeight: 22,
    },
    inputSpacing: {
        marginBottom: SPACING.xl,
    },
    mainButton: {
        marginTop: SPACING.m,
    },
});
