import path from "path"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js"
import http from "http"
import { Server } from "socket.io"
import { createClient } from "redis"
import dataRoutes from "./routes/dataRoutes.js"
import DataModel from "./models/DataModel.js"
import mongoose from "mongoose"

dotenv.config()

// MongoDB connection
connectDB()

const PORT = process.env.PORT || 8080

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id)

  socket.on("disconnect", () => {
    console.log("A client disconnected:", socket.id)
  })

  socket.on("switch", (status = "off") => {
    console.log("Switch status:", status)
    startPublishData(status)
  })
})

// Create Redis clients for publishing and subscribing
const redisPublisher = createClient({
  url: process.env.REDIS_URL,
})
const redisSubscriber = createClient({
  url: process.env.REDIS_URL,
})

// Connect Redis clients
redisPublisher.on("connect", () => console.log("Redis Publisher connected"))
redisSubscriber.on("connect", () => console.log("Redis Subscriber connected"))

redisPublisher.on("error", (err) =>
  console.error("Redis Publisher error:", err)
)
redisSubscriber.on("error", (err) =>
  console.error("Redis Subscriber error:", err)
)

// Start Redis connections
redisPublisher.connect()
redisSubscriber.connect()

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PATCH, DELETE, PUT",
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Publish data to Redis every 60 seconds
const publishData = (deviceId) => {
  const data = {
    _id: new mongoose.Types.ObjectId(),
    deviceId,
    createdAt: new Date().toISOString(),
    temperature: (Math.random() * 10 + 20).toFixed(2),
    humidity: (Math.random() * 30 + 50).toFixed(2),
  }

  redisPublisher.publish("sensor-data", JSON.stringify(data))
  console.log("Published data:", data)
}

const intervals = {}

function startPublishData(status = "off") {
  if (status === "on") {
    publishData("device_001")
    publishData("device_002")
    publishData("device_003")
    if (!intervals["device_001"]) {
      intervals["device_001"] = setInterval(
        () => publishData("device_001"),
        60000
      )
    }
    if (!intervals["device_002"]) {
      intervals["device_002"] = setInterval(
        () => publishData("device_002"),
        60000
      )
    }
    if (!intervals["device_003"]) {
      intervals["device_003"] = setInterval(
        () => publishData("device_003"),
        60000
      )
    }
  } else if (status === "off") {
    for (const deviceId in intervals) {
      clearInterval(intervals[deviceId])
      delete intervals[deviceId]
    }
    console.log("Stopped publishing data.")
  }
}
// Subscribe to Redis channel
redisSubscriber.subscribe("sensor-data", async (message) => {
  try {
    const data = JSON.parse(message)
    console.log("Received data from Redis:", data)

    // Broadcast the data via WebSocket
    io.emit("data-update", data)

    // Save to MongoDB
    // await DataModel.create(data)
    console.log("Data saved to MongoDB")
  } catch (error) {
    console.error("Error processing message:", error)
  }
})

// Routes
app.use("/api", dataRoutes)

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve()
  app.use(express.static(path.resolve(__dirname, "../client/dist"))) // Serve static files from one level up

  app.use(
    "*",
    (req, res) =>
      res.sendFile(path.resolve(__dirname, "../client/dist/index.html")) // Handle SPA routing
  )
} else {
  app.get("/", (req, res) => {
    res.send("API is running...")
  })
}

// Error handling
app.use(notFound)
app.use(errorHandler)

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
