import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import {NextResponse} from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const {fullName, email, password, bloodGroup, city, phone} = body;

    const existingUser = await User.findOne({email});

    if (existingUser) {
      return NextResponse.json({error: "User already exists!"}, {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // creating a new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role: "donor",
      bloodGroup,
      city,
      phone,
    });

    await newUser.save();

    return NextResponse.json({message: "User registered successfully!"}, {status: 201});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Server error"}, {status: 500});
  }
}
