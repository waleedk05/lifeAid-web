const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config({path: ".env.local"}); // or ".env"
const User = require("./src/models/User");

async function seedAdmin() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI not found in .env");
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");

    const adminEmail = process.env.ADMIN_EMAIL;
    const existingAdmin = await User.findOne({email: adminEmail});

    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);

    const admin = new User({
      fullName: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin user created!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
  }
}

seedAdmin();
