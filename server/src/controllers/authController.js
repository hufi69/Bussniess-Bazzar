const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// Generate 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const otpCode = generateOTP();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        const user = await User.create({
            name,
            email,
            password,
            otp: {
                code: otpCode,
                expiresAt: otpExpiresAt,
            },
        });

        if (user) {
            // Send OTP via email
            const message = `Your verification code is ${otpCode}. It will expire in 10 minutes.`;

            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Email Verification',
                    message,
                    html: `<h1>Email Verification</h1><p>${message}</p>`,
                });

                res.status(201).json({
                    success: true,
                    message: 'User registered. Please check your email for OTP.',
                    userId: user._id,
                });
            } catch (err) {
                console.error('Email send error:', err);
                // Even if email fails, user is created. In production, you might want to handle this better.
                res.status(201).json({
                    success: true,
                    message: 'User registered, but OTP email failed to send.',
                    userId: user._id,
                });
            }
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOTP = async (req, res) => {
    try {
        const { userId, otp } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ success: false, message: 'User already verified' });
        }

        if (user.otp.code !== otp || user.otp.expiresAt < Date.now()) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        user.isVerified = true;
        user.otp = undefined; // Clear OTP data
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        if (!user.isVerified) {
            return res.status(401).json({ success: false, message: 'Please verify your email first', isVerified: false, userId: user._id });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        res.json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
