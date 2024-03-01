const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const validator = require("validator");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "None",
    secure: true,
  };
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    message: "Login successfull.",
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
  });

  newUser.password = undefined;
  res.status(201).json({
    message: "User created Successfully.",
    user: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide email and password", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkPassword(password, user.password)))
    return next(new AppError("Invalid email or password.", 401));

  createAndSendToken(user, 200, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "cookie", {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.status(200).json({
    message: "Logged out successfully.",
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, oldPassword, newPassword } = req.body;

  // Check if at least one field is being updated
  if (!name && !oldPassword && !newPassword) {
    return next(
      new AppError("At least one field must be provided for update", 400)
    );
  }

  const user = await User.findById(req.user.id).select("+password");

  // Update name if provided and not empty
  if (name !== undefined && name !== "") {
    user.name = name;
  }

  // Update password if both old and new passwords are provided
  if (oldPassword && newPassword) {
    // Check if old password matches
    const checkPassword = await user.checkPassword(oldPassword, user.password);
    if (!checkPassword) {
      return next(new AppError("Incorrect password!", 401));
    }
    // Check if old and new passwords are the same
    if (oldPassword === newPassword) {
      return next(
        new AppError("New password cannot be same as the old password", 400)
      );
    }
    // Validate and update password
    if (!validator.isStrongPassword(newPassword)) {
      return next(
        new AppError(
          "Password must contain at least 8 characters, including one letter and one number",
          400
        )
      );
    }
    user.password = newPassword;
    user.confirmPassword = newPassword;
  }

  // Save the user
  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    message: "User updated successfully",
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token)
    return next(
      new AppError(
        "You are not logged in please login first to get access.",
        401
      )
    );

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError("No user found.", 404));
  req.user = user;
  next();
});

exports.getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.id });
  const userWithoutPassword = user.toJSON();
  res.status(200).json({ user: userWithoutPassword });
};
