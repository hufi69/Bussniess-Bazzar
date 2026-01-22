import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Info, Phone as PhoneIcon, ShieldCheck } from 'lucide-react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { TOP_COLORS, SPACING, TYPOGRAPHY, LAYOUT } from '../config/theme';
import { useLogin } from '../hooks/auth/useAuth';

import { Formik } from 'formik';
import { loginSchema } from '../utils/validation';
import { showAlert } from '../utils/alert';

export const LoginScreen = () => {
    const navigation = useNavigation<any>();
    const { mutate: login, isPending: loading } = useLogin();

    const handleLogin = (values: any) => {
        login(
            values,
            {
                onSuccess: (data) => {
                    showAlert('Success', 'success', 'Logged in successfully');
                    navigation.navigate('Home');
                },
                onError: (error: any) => {
                    const message = error?.response?.data?.message || 'Login failed';
                    if (message.includes('verify your email')) {
                        showAlert('Verification Required', 'info', message);
                        navigation.navigate('VerifyOTP', {
                            userId: error.response.data.userId,
                            email: values.email
                        });
                    } else {
                        showAlert('Error', 'danger', message);
                    }
                },
            }
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={handleLogin}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                            {/* Header */}
                            <View style={styles.header}>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                    <ChevronLeft color={TOP_COLORS.white} size={24} />
                                </TouchableOpacity>
                                <Text style={styles.headerTitle}>Login</Text>
                                <View style={{ width: 24 }} />
                            </View>

                            <View style={styles.imageContainer}>
                                <View style={styles.iconCircle}>
                                    <ShieldCheck size={48} color={TOP_COLORS.primary} />
                                </View>
                            </View>

                            <Text style={styles.title}>Welcome Back</Text>
                            <Text style={styles.subtitle}>
                                Securely access your escrow wallet and manage transactions.
                            </Text>

                            <View style={styles.form}>
                                <Input
                                    label="Email Address"
                                    placeholder="you@example.com"
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    error={touched.email ? errors.email : undefined}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    containerStyle={styles.inputSpacing}
                                />

                                <Input
                                    label="Password"
                                    placeholder="Enter your password"
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    error={touched.password ? errors.password : undefined}
                                    secureTextEntry
                                    containerStyle={styles.inputSpacing}
                                />

                                <Button
                                    title="Login"
                                    onPress={handleSubmit as any}
                                    loading={loading}
                                    style={styles.mainButton}
                                />

                                <View style={styles.footer}>
                                    <Text style={styles.footerText}>New to BazaarShield? <Text style={styles.footerLink} onPress={() => navigation.navigate('Signup')}>Create Account</Text></Text>
                                </View>
                            </View>
                        </ScrollView>
                    )}
                </Formik>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: TOP_COLORS.background,
    },
    scrollContent: {
        padding: SPACING.l,
        minHeight: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    headerTitle: {
        ...TYPOGRAPHY.h2,
        fontSize: 18,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
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
        shadowColor: TOP_COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        ...TYPOGRAPHY.h1,
        fontSize: 26,
        marginBottom: SPACING.xs,
        marginTop: SPACING.s,
    },
    subtitle: {
        ...TYPOGRAPHY.body,
        fontSize: 15,
        marginBottom: SPACING.xl,
        color: TOP_COLORS.textSecondary,
        lineHeight: 22,
    },
    form: {
        flex: 1,
    },
    inputSpacing: {
        marginBottom: SPACING.xl,
    },
    mainButton: {
        marginBottom: SPACING.xl,
        shadowColor: TOP_COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
    },
    footer: {
        alignItems: 'center',
    },
    footerText: {
        color: TOP_COLORS.textSecondary,
        fontSize: 14,
    },
    footerLink: {
        color: TOP_COLORS.primary,
        fontWeight: '700',
    },
});
