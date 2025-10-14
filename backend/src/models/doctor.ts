import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
    specialization: {
      type: String,
    },
    designation: {
      type: String,
    },
    availability: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Availability",
      },
    ],
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
  },
  { timestamps: true }
);

const DoctorModel = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export { DoctorModel };
