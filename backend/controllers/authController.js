import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { hash, compare } = bcrypt;

export async function signup(req, res) {
  try {
    const { email, password, hobbies, strengths, weaknesses } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPw = await hash(password, 10);

    const user = new User({
      email,
      password: hashedPw,
      hobbies,
      strengths,
      weaknesses,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      profile: {
        email: user.email,
        hobbies: user.hobbies,
        strengths: user.strengths,
        weaknesses: user.weaknesses,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
