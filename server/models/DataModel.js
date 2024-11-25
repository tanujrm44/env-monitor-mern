import mongoose from "mongoose"

const DataSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const DataModel = mongoose.model("Data", DataSchema)

export default DataModel
