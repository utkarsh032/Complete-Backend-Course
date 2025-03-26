import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import User from "../models/user.model.js"
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js"

// Sign-Up User
export const SignUp = async (req, res, next) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const { name, email, password } = req.body
    const existingEmail = await User.findOne({ email })

    // Check for existing email
    if (existingEmail) {
      await session.abortTransaction()
      session.endSession()
      return res.status(409).json({ message: "Email already exists", existingEmail })
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user within session
    const newUsers = await User.create([{ name, email, password: hashedPassword }], { session })

    // Generate JWT
    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

    await session.commitTransaction()
    session.endSession()

    res.status(201).json({ message: "User SignUp SuccessFully", newUsers, token })
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    next(error)
  }
}


// Sign-In User
export const SignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Email Validation
    const user = await User.findOne({ email })

    if (!user) {
      res.status(404).send({
        message: "User is not exist!"
      })
    }

    // Password Validation
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid Password' })
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

    res.status(200).json({ success: true, message: 'User Signed in Successfully', data: { token, user } })
  } catch (error) {
    next(error)
  }
}



// Sign-Out User
// Sign-Out User
export const SignOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({
      success: true,
      message: "User signed out successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to sign out",
      error: error.message,
    });
  }
};
