import api from '../api';

export const authService = {
    signup: async (data: any) => {
        const response = await api.post('/auth/signup', data);
        return response.data;
    },
    verifyOTP: async (data: { userId: string; otp: string }) => {
        const response = await api.post('/auth/verify-otp', data);
        return response.data;
    },
    login: async (data: any) => {
        const response = await api.post('/auth/login', data);
        return response.data;
    },
};
