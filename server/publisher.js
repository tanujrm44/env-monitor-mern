import client from "./client.js"

const publishData = () => {
  const data = {
    deviceId: "device_001",
    timestamp: new Date().toISOString(),
    temperature: (Math.random() * 10 + 20).toFixed(2),
    humidity: (Math.random() * 30 + 50).toFixed(2),
  }

  client.publish("sensor-data", JSON.stringify(data))
  console.log("Published data:", data)
}

// Simulate data publishing every 5 seconds
setInterval(publishData, 60000)
