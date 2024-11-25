import connectDB from "./config/db.js"
import DataModel from "./models/DataModel.js"
const sampleData = []

// Generate 100 rows of sample data
for (let i = 1; i <= 3; i++) {
  for (let j = 0; j < 100; j++) {
    const deviceId = `device_00${i}`
    const randomTimestamp = new Date(
      Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
    )
    const randomTemperature = (Math.random() * (30 - 20) + 20).toFixed(2)
    const randomHumidity = (Math.random() * (80 - 50) + 50).toFixed(2)
    sampleData.push({
      deviceId,
      timestamp: randomTimestamp,
      temperature: parseFloat(randomTemperature),
      humidity: parseFloat(randomHumidity),
    })
  }
}

const importData = async () => {
  await connectDB()
  try {
    await DataModel.deleteMany()
    await DataModel.insertMany(sampleData)
    console.log("Data Imported!")
    process.exit()
  } catch (error) {
    console.error(`Error: ${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  await connectDB()

  try {
    await DataModel.deleteMany()

    console.log("Data Destroyed!")
    process.exit()
  } catch (error) {
    console.error(`Error: ${error}`)
  }
}

if (process.argv[2] == "-d") {
  destroyData()
} else {
  importData()
}
