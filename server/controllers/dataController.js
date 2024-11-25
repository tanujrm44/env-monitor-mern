import DataModel from "../models/DataModel.js"
import asyncHandler from "express-async-handler"

const getData = asyncHandler(async (req, res) => {
  const device = req.params.device
  const data = await DataModel.find({
    deviceId: device,
  }).sort({ _id: -1 })
  res.json(data)
})

export { getData }
