import mongoose, {mongo} from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    date: {type: Date, required: true},
    time: {type: String, required: true},
    location: {
      lat: Number,
      lng: Number,
    },
    images: [String],
    goingUsers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  },
  {timestamps: true}
);

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
