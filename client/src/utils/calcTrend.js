export const calcTrend = (data = []) => {
  console.log(data)
  if (data?.length < 2)
    return { temperatureTrend: "stable", humidityTrend: "stable" }

  const temperatureValues = data?.map((reading) => reading.temperature)
  const humidityValues = data?.map((reading) => reading.humidity)

  const getTrend = (values) => {
    let rising = 0,
      falling = 0

    for (let i = 1; i < values?.length; i++) {
      if (values[i] > values[i - 1]) rising++
      else if (values[i] < values[i - 1]) falling++
    }

    if (rising > falling) return "rising"
    if (falling > rising) return "falling"
    return "stable"
  }

  const temperatureTrend = getTrend(temperatureValues)
  const humidityTrend = getTrend(humidityValues)

  return { temperatureTrend, humidityTrend }
}
