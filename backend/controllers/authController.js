import User from "../models/User.js";
import { asyncHandler } from "../middleware/error.js";
import crypto from "crypto";

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  // Create verification token
  const verificationToken = crypto.randomBytes(20).toString("hex");

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: role || "user",
    verificationToken,
  });

  // Send verification email (implement email service later)
  // sendVerificationEmail(user.email, verificationToken);

  // Create token
  const token = user.getSignedJwtToken();

  res.status(201).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    },
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide an email and password",
    });
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // Create token
  const token = user.getSignedJwtToken();

  res.json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    },
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      avatar: user.avatar,
      isVerified: user.isVerified,
    },
  });
});

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
export const updateDetails = asyncHandler(async (req, res) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      avatar: user.avatar,
      isVerified: user.isVerified,
    },
  });
});

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
export const updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check current password
  const isMatch = await user.matchPassword(req.body.currentPassword);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Current password is incorrect",
    });
  }

  user.password = req.body.newPassword;
  await user.save();

  // Create token
  const token = user.getSignedJwtToken();

  res.json({
    success: true,
    token,
  });
});

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "There is no user with that email",
    });
  }

  // Get reset token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save();

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/resetpassword/${resetToken}`;

  // Send email (implement email service later)
  // sendResetPasswordEmail(user.email, resetUrl);

  res.json({
    success: true,
    message: "Email sent",
  });
});

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid token",
    });
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  // Create token
  const token = user.getSignedJwtToken();

  res.json({
    success: true,
    token,
  });
});

// @desc    Verify email
// @route   GET /api/auth/verify/:token
// @access  Public
export const verifyEmail = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    verificationToken: req.params.token,
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid token",
    });
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  // Create token
  const token = user.getSignedJwtToken();

  res.json({
    success: true,
    token,
    message: "Email verified successfully",
  });
});
