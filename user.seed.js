import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.model.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany();

    await User.insertMany([
      {
        name: "John Resident",
        email: "resident@test.com",
        role: "resident"
      },
      {
        name: "Sarah Manager",
        email: "manager@test.com",
        role: "manager"
      },
      {
        name: "Mike Technician",
        email: "tech@test.com",
        role: "technician"
      }
    ]);

    console.log("Users seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();