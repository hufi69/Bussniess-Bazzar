import { useMutation } from '@tanstack/react-query';
import { authService } from '../../services/auth/authService';

export const useSignup = () => {
    return useMutation({
        mutationFn: (data: any) => authService.signup(data),
    });
};

export const useVerifyOTP = () => {
    return useMutation({
        mutationFn: (data: { userId: string; otp: string }) => authService.verifyOTP(data),
    });
};

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: any) => authService.login(data),
    });
};
