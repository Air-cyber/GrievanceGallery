import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const userRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password , role } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password||
    !role
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already Registered!", 400));
  }

  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role,
  });
  generateToken(user, "User Registered!", 200, res);
  });
  
    export const login = catchAsyncErrors(async (req, res, next) => {
      const { email, password, confirmPassword, role } = req.body;
      if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
      }
      if (password !== confirmPassword) {
        return next(
          new ErrorHandler("Password & Confirm Password Do Not Match!", 400)
        );
      }
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Invalid Email Or Password!", 400));
      }
    
      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid Email Or Password!", 400));
      }
      if (role !== user.role) {
        return next(new ErrorHandler(`User Not Found With This Role!`, 400));
      }
      generateToken(user, "User Login Successfully!", 200, res);
    });

    export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
      const { firstName, lastName, email, phone, nic, dob, gender, password } =
        req.body;
      if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !password
      ) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
      }

      const isRegistered = await User.findOne({ email });
      if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role}  With This Email Already Exists!`));
      }

      const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role: "Admin",
      });
      res.status(200).json({
        success: true,
        message: "New Admin Registered",
        admin,
      });
    });

    export const addNewMinister = catchAsyncErrors(async (req, res, next) => {
      if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Minister Avatar Required!", 400));
      }
      const { ministerAvatar } = req.files;
      const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedFormats.includes(ministerAvatar.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported!", 400));
      }
      const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        ministerDepartment,
      } = req.body;
      if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !password ||
        !ministerDepartment ||
        !ministerAvatar
      ) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
      }
      const isRegistered = await User.findOne({ email });
      if (isRegistered) {
        return next(
          new ErrorHandler("Minister With This Email Already Exists!", 400)
        );
      }
      const cloudinaryResponse = await cloudinary.uploader.upload(
        ministerAvatar.tempFilePath
      );
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary Error:",
          cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(
          new ErrorHandler("Failed To Upload Minister Avatar To Cloudinary", 500)
        );
      }
      const minister = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role: "Minister",
        ministerDepartment,
        ministerAvatar: {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        },
      });
      res.status(200).json({
        success: true,
        message: "New Minister Registered",
        minister,
      });
    });

    export const getAllMinister = catchAsyncErrors(async (req, res, next) => {
      const minister = await User.find({ role: "Minister" });
      res.status(200).json({
        success: true,
        minister,
      });
    });

    export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
      const user = req.user;
      res.status(200).json({
        success: true,
        user,
      });
    });

    // Logout function for dashboard admin
    export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
      res
        .status(201)
        .cookie("adminToken", "", {
          httpOnly: true,
          expires: new Date(Date.now()),
        })
        .json({
          success: true,
          message: "Admin Logged Out Successfully.",
        });
    });

    // Logout function for frontend patient
    export const logoutUser = catchAsyncErrors(async (req, res, next) => {
      res
        .status(201)
        .cookie("userToken", "", {
          httpOnly: true,
          expires: new Date(Date.now()),
        })
        .json({
          success: true,
          message: "User Logged Out Successfully.",
        });
    });


