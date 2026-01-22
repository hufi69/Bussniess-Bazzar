import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, ShoppingBag, Store, CheckCircle2, Info, Phone as PhoneIcon, ShieldCheck } from 'lucide-react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { TOP_COLORS, SPACING, TYPOGRAPHY, LAYOUT } from '../config/theme';
import { useSignup } from '../hooks/auth/useAuth';

import { Formik } from 'formik';
import { signupSchema } from '../utils/validation';
import { showAlert } from '../utils/alert';

export const SignupScreen = () => {
    const navigation = useNavigation<any>();
    const [accountType, setAccountType] = useState<'buyer' | 'seller'>('buyer');
    const { mutate: signup, isPending: loading } = useSignup();

    const handleSignup = (values: any) => {
        signup(
            { ...values, accountType },
            {
                onSuccess: (data) => {
                    showAlert('Success', 'success', 'OTP sent to your email');
                    navigation.navigate('VerifyOTP', { userId: data.userId, email: values.email });
                },
                onError: (error: any) => {
                    const message = error?.response?.data?.message || 'Signup failed';
                    showAlert('Error', 'danger', message);
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
                    initialValues={{ name: '', email: '', phone: '', password: '' }}
                    validationSchema={signupSchema}
                    onSubmit={handleSignup}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                            {/* Header */}
                            <View style={styles.header}>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                    <ChevronLeft color={TOP_COLORS.white} size={24} />
                                </TouchableOpacity>
                                <Text style={styles.headerTitle}>Create Account</Text>
                                <View style={{ width: 24 }} />
                            </View>

                            <View style={styles.imageContainer}>
                                <View style={styles.iconCircle}>
                                    <ShieldCheck size={48} color={TOP_COLORS.primary} />
                                </View>
                            </View>

                            <Text style={styles.title}>Join the Marketplace</Text>
                            <Text style={styles.subtitle}>
                                Start secure social-commerce transactions in Pakistan with escrow protection.
                            </Text>

                            <View style={styles.form}>
                                <Input
                                    label="Full Name"
                                    placeholder="Enter your full name"
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    error={touched.name ? errors.name : undefined}
                                    containerStyle={styles.inputSpacing}
                                />

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
                                    label="Phone Number"
                                    placeholder="+92 XXX XXXXXXX"
                                    value={values.phone}
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    error={touched.phone ? errors.phone : undefined}
                                    keyboardType="phone-pad"
                                    rightComponent={<PhoneIcon size={20} color={TOP_COLORS.textSecondary} />}
                                    containerStyle={styles.inputSpacing}
                                />

                                <Input
                                    label="Password"
                                    placeholder="Minimum 6 characters & 1 number"
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    error={touched.password ? errors.password : undefined}
                                    secureTextEntry
                                    containerStyle={styles.inputSpacing}
                                />

                                <Text style={styles.sectionLabel}>Account Type</Text>
                                <View style={styles.accountTypeContainer}>
                                    <TouchableOpacity
                                        style={[styles.typeCard, accountType === 'buyer' && styles.activeTypeCard]}
                                        onPress={() => setAccountType('buyer')}
                                    >
                                        {/* Simplified CheckIcon */}
                                        <View style={[styles.iconCircle, accountType === 'buyer' && styles.activeIconCircle]}>
                                            <ShoppingBag size={24} color={accountType === 'buyer' ? TOP_COLORS.black : TOP_COLORS.textSecondary} />
                                        </View>
                                        <Text style={styles.typeTitle}>Buyer</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.typeCard, accountType === 'seller' && styles.activeTypeCard]}
                                        onPress={() => setAccountType('seller')}
                                    >
                                        <View style={[styles.iconCircle, accountType === 'seller' && styles.activeIconCircle]}>
                                            <Store size={24} color={accountType === 'seller' ? TOP_COLORS.black : TOP_COLORS.textSecondary} />
                                        </View>
                                        <Text style={styles.typeTitle}>Seller</Text>
                                    </TouchableOpacity>
                                </View>

                                {accountType === 'seller' && (
                                    <View style={styles.verificationNote}>
                                        <Info size={18} color={TOP_COLORS.primary} />
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.verificationTitle}>Seller Verification Required</Text>
                                            <Text style={styles.verificationText}>Automated KYC will be initiated after signup.</Text>
                                        </View>
                                    </View>
                                )}

                                <Button
                                    title="Create Account"
                                    onPress={handleSubmit as any}
                                    loading={loading}
                                    style={styles.mainButton}
                                />
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
        paddingBottom: SPACING.xxl,
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
        marginBottom: SPACING.l,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: TOP_COLORS.text,
        letterSpacing: 1,
        marginBottom: SPACING.m,
        marginLeft: SPACING.xs,
        textTransform: 'uppercase',
    },
    accountTypeContainer: {
        flexDirection: 'row',
        gap: SPACING.m,
        marginBottom: SPACING.xl,
    },
    typeCard: {
        flex: 1,
        backgroundColor: TOP_COLORS.surfaceHighlight, // Dark card
        borderRadius: LAYOUT.borderRadius.l,
        padding: SPACING.m,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
        minHeight: 150,
        position: 'relative',
    },
    activeTypeCard: {
        borderColor: TOP_COLORS.primary,
        backgroundColor: 'rgba(34, 197, 94, 0.05)', // Very subtle green tint
    },
    checkIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    iconCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: TOP_COLORS.surface, // Slightly darker than card
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.m,
        borderWidth: 1,
        borderColor: TOP_COLORS.border,
    },
    activeIconCircle: {
        backgroundColor: TOP_COLORS.primary,
        borderColor: TOP_COLORS.primary,
    },
    typeTitle: {
        color: TOP_COLORS.white,
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 4,
    },
    typeDesc: {
        color: TOP_COLORS.textSecondary,
        fontSize: 12,
        textAlign: 'center',
    },
    verificationNote: {
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        padding: SPACING.m,
        borderRadius: LAYOUT.borderRadius.m,
        flexDirection: 'row',
        gap: SPACING.m,
        marginBottom: SPACING.xl,
        borderWidth: 1,
        borderColor: 'rgba(34, 197, 94, 0.2)',
    },
    verificationTitle: {
        color: TOP_COLORS.primary,
        fontWeight: '700',
        fontSize: 14,
        marginBottom: 2,
    },
    verificationText: {
        color: TOP_COLORS.textSecondary,
        fontSize: 13,
        lineHeight: 18,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: SPACING.xl,
        paddingHorizontal: SPACING.xs,
    },
    infoText: {
        color: TOP_COLORS.textSecondary,
        fontSize: 13,
        flex: 1,
    },
    mainButton: {
        marginTop: SPACING.xs,
        shadowColor: TOP_COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
    },
});
