import { connectDB } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";


connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const { username, email, password } = reqBody;

    const user = await User.findOne({ email })

    if (user) {
      return NextResponse.json({ message: "user already exists" })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email, username, password: hashedPassword
    })

    const savedUser = await newUser.save();

    // await sendEmail() //send mail here

    return NextResponse.json({ message: "user registered successfully" }, { status: 201 })

  } catch (error: any) {
    return NextResponse.json({ error, message: error.message }, { status: 500 })
  }
}