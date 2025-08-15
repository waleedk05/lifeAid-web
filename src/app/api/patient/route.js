// app/api/patient/route.js
import {NextResponse} from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const {fullName, email, password} = await req.json();
    await dbConnect();

    const existingUser = await User.findOne({email});
    if (existingUser) {
      return NextResponse.json({error: "Email already exists"}, {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: "patient",
    });

    return NextResponse.json({message: "Patient created", user: newUser}, {status: 201});
  } catch (err) {
    console.error(err);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
