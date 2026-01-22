import * as Yup from 'yup';

const passwordSchema = Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/\d/, 'Password must contain at least one number')
    .required('Password is required');

export const signupSchema = Yup.object().shape({
    name: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string()
        .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
        .required('Phone number is required'),
    password: passwordSchema,
});

export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export const otpSchema = Yup.object().shape({
    otp: Yup.string().length(6, 'OTP must be 6 digits').required('OTP is required'),
});
