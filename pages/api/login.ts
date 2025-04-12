import { connectToDatabase } from "@/lib/mongodb";
import User from "@/model/User";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }

  try {
    await connectToDatabase();

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
