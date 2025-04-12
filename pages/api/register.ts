import { NextApiRequest, NextApiResponse } from "next";
import User from "@/model/User";
import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing name, email, or password" });
  }
  await connectToDatabase();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }
  const newUser = new User({ name, email, password: password });
  await newUser.save();
  return res.status(201).json({ message: "User registered successfully" });
}
