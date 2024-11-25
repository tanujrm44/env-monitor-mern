import React from "react"
import { Line } from "react-chartjs-2"
import "chart.js/auto"
import { calcTrend } from "../utils/calcTrend"
import { Col, Container, Row } from "react-bootstrap"
import { convertMinutesAgo } from "../utils/convertMinutesAgo"

const TrendChart = ({ data = [] }) => {
  console.log(data)
  const trends = calcTrend(data)
  const humidityChartData = {
    labels: data
      .map(
        (item) =>
          `${convertMinutesAgo(
            new Date(item.timestamp || item.createdAt).getTime()
          )}m`
      )
      .slice(0, 10),
    datasets: [
      {
        label: "Humidity (%)",
        data: data.map((item) => item.humidity).slice(0, 10),
        borderColor:
          trends.humidityTrend === "rising"
            ? "green"
            : trends.humidityTrend === "falling"
            ? "red"
            : "blue",
        backgroundColor:
          trends.humidityTrend === "rising"
            ? "rgba(0, 255, 0, 0.2)"
            : trends.humidityTrend === "falling"
            ? "rgba(255, 0, 0, 0.2)"
            : "rgba(0, 0, 255, 0.2)",
        fill: true,
      },
    ],
  }

  const humidityChartOptions = {
    responsive: true,

    plugins: {
      title: {
        display: true,
        text: "Humidity Trend",
      },
      legend: {
        display: true,
        labels: {
          generateLabels: (chart) => [
            {
              text: "Rising",
              fillStyle: "green",
            },
            {
              text: "Stable",
              fillStyle: "blue",
            },
            {
              text: "Falling",
              fillStyle: "red",
            },
          ],
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Humidity",
        },
      },
    },
  }
  const tempChartData = {
    labels: data
      .map(
        (item) =>
          `${convertMinutesAgo(
            new Date(item.timestamp || item.createdAt).getTime()
          )}m`
      )
      .slice(0, 10),
    datasets: [
      {
        label: "Temperature (%)",
        data: data.map((item) => item.temperature).slice(0, 10),
        borderColor:
          trends.temperatureTrend === "rising"
            ? "green"
            : trends.temperatureTrend === "falling"
            ? "red"
            : "blue",
        backgroundColor:
          trends.temperatureTrend === "rising"
            ? "rgba(0, 255, 0, 0.2)"
            : trends.temperatureTrend === "falling"
            ? "rgba(255, 0, 0, 0.2)"
            : "rgba(0, 0, 255, 0.2)",
        fill: true,
      },
    ],
  }

  const tempChartOptions = {
    responsive: true,

    plugins: {
      title: {
        display: true,
        text: "Temperature Trend",
      },
      legend: {
        display: true,
        labels: {
          generateLabels: (chart) => [
            {
              text: "Rising",
              fillStyle: "green", // Color for rising
            },
            {
              text: "Stable",
              fillStyle: "blue", // Color for stable
            },
            {
              text: "Falling",
              fillStyle: "red", // Color for falling
            },
          ],
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Percentage",
        },
      },
    },
  }

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Line data={tempChartData} options={tempChartOptions} />
        </Col>
        <Col md={6}>
          <Line data={humidityChartData} options={humidityChartOptions} />
        </Col>
      </Row>
    </Container>
  )
}

export default TrendChart
