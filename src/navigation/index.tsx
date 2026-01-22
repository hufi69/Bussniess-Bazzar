import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { VerifyOTPScreen } from '../screens/VerifyOTPScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { TOP_COLORS } from '../config/theme';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: TOP_COLORS.background },
                    headerStyle: { backgroundColor: TOP_COLORS.background },
                    headerTintColor: TOP_COLORS.text,
                }}
                initialRouteName="Welcome"
            >
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Signup"
                    component={SignupScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VerifyOTP"
                    component={VerifyOTPScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
