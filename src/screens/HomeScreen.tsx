import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { ShieldCheck, Plus, Bell, Menu } from 'lucide-react-native';
import { TOP_COLORS, SPACING, TYPOGRAPHY, LAYOUT } from '../config/theme';

export const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={TOP_COLORS.background} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity style={styles.avatar}>
                        <Text style={styles.avatarText}>AK</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.greeting}>Hello, Huzaifa 👋</Text>
                        <Text style={styles.location}>Lahore, Pakistan</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.iconBtn}>
                    <Bell color={TOP_COLORS.white} size={24} />
                    <View style={styles.badge} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Balance Card */}
                <View style={styles.balanceCard}>
                    <View>
                        <Text style={styles.balanceLabel}>Total Balance</Text>
                        <Text style={styles.balanceValue}>PKR 0.00</Text>
                    </View>
                    <TouchableOpacity style={styles.addBtn}>
                        <Plus color={TOP_COLORS.black} size={20} />
                        <Text style={styles.addBtnText}>Top Up</Text>
                    </TouchableOpacity>
                </View>

                {/* Quick Actions */}
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.actionsGrid}>
                    <TouchableOpacity style={styles.actionItem}>
                        <View style={[styles.actionIcon, { backgroundColor: '#3B82F6' }]}>
                            <ShieldCheck color={TOP_COLORS.white} size={24} />
                        </View>
                        <Text style={styles.actionLabel}>New Escrow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionItem}>
                        <View style={[styles.actionIcon, { backgroundColor: '#F59E0B' }]}>
                            <Menu color={TOP_COLORS.white} size={24} />
                        </View>
                        <Text style={styles.actionLabel}>Transactions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionItem}>
                        <View style={[styles.actionIcon, { backgroundColor: '#10B981' }]}>
                            <ShieldCheck color={TOP_COLORS.white} size={24} />
                        </View>
                        <Text style={styles.actionLabel}>Verify Seller</Text>
                    </TouchableOpacity>
                </View>

                {/* Recent Activity */}
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                <View style={styles.emptyState}>
                    <ShieldCheck size={48} color={TOP_COLORS.textSecondary} />
                    <Text style={styles.emptyText}>No transactions yet</Text>
                    <Text style={styles.emptySub}>Start a secure transaction today</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: TOP_COLORS.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.l,
        paddingTop: SPACING.m,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.m,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: TOP_COLORS.surfaceHighlight,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: TOP_COLORS.border,
    },
    avatarText: {
        color: TOP_COLORS.primary,
        fontWeight: '700',
        fontSize: 18,
    },
    greeting: {
        color: TOP_COLORS.white,
        fontWeight: '700',
        fontSize: 16,
    },
    location: {
        color: TOP_COLORS.textSecondary,
        fontSize: 12,
    },
    iconBtn: {
        position: 'relative',
        padding: 8,
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: TOP_COLORS.accent,
    },
    content: {
        padding: SPACING.l,
    },
    balanceCard: {
        backgroundColor: TOP_COLORS.surface,
        borderRadius: LAYOUT.borderRadius.l,
        padding: SPACING.l,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xl,
        borderWidth: 1,
        borderColor: TOP_COLORS.border,
    },
    balanceLabel: {
        color: TOP_COLORS.textSecondary,
        fontSize: 14,
        marginBottom: 4,
    },
    balanceValue: {
        color: TOP_COLORS.white,
        fontSize: 28,
        fontWeight: '700',
    },
    addBtn: {
        backgroundColor: TOP_COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        gap: 4,
    },
    addBtnText: {
        color: TOP_COLORS.black,
        fontWeight: '700',
        fontSize: 14,
    },
    sectionTitle: {
        ...TYPOGRAPHY.h2,
        fontSize: 18,
        marginBottom: SPACING.m,
    },
    actionsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.xl,
    },
    actionItem: {
        alignItems: 'center',
        gap: 8,
        width: '30%',
    },
    actionIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionLabel: {
        color: TOP_COLORS.textSecondary,
        fontSize: 12,
    },
    emptyState: {
        backgroundColor: TOP_COLORS.surfaceHighlight,
        borderRadius: LAYOUT.borderRadius.l,
        padding: SPACING.xl,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.m,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: TOP_COLORS.border,
    },
    emptyText: {
        color: TOP_COLORS.white,
        fontWeight: '700',
        fontSize: 16,
    },
    emptySub: {
        color: TOP_COLORS.textSecondary,
        fontSize: 14,
    },
});
