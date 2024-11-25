export const generateRandomReading = (deviceId) => {
  return {
    deviceId: deviceId,
    timestamp: new Date().toISOString(),
    temperature: (Math.random() * 10 + 20).toFixed(2), // Random temp between 20-30°C
    humidity: (Math.random() * 30 + 50).toFixed(2), // Random humidity between 50-80%
  }
}
