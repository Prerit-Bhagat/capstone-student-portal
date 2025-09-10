import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  dayOfWeek: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

const AvailabilityModel =
  mongoose.models.Availability || mongoose.model("Availability", availabilitySchema);

export { AvailabilityModel };
