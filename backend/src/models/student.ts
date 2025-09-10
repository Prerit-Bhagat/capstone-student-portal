import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isPasswordDefault: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    hostel: {
      type: String,
    },
    roomNumber: {
      type: String,
    },
    yearOfStudy: {
      type: Number,
      required: true,
    },
    emergencyContact: {
      type: String,
    },
    bloodGroup: {
      type: String,
      enum: ["A_POS", "A_NEG", "B_POS", "B_NEG", "AB_POS", "AB_NEG", "O_POS", "O_NEG"],
      required: true,
    },
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
  },
  { timestamps: true }
);

const StudentModel = mongoose.models.Student || mongoose.model("Student", studentSchema);

export { StudentModel };
