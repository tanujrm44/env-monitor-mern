import React, { useEffect, useState } from "react"
import Table from "react-bootstrap/Table"
import axios from "axios"
import { convertMinutesAgo } from "../utils/convertMinutesAgo"
import { calcTrend } from "../utils/calcTrend"

export default function Readings({ readings }) {
  const tempTrend = calcTrend(readings.slice(0, 10)).temperatureTrend
  const humidityTrend = calcTrend(readings.slice(0, 10)).humidityTrend

  return (
    <div
      style={{
        maxHeight: "300px",
        overflowY: "auto",
        margin: "0 auto",
      }}
    >
      <Table striped bordered hover size="sm">
        <thead
          className="table-primary"
          style={{ position: "sticky", top: 0, zIndex: 1 }}
        >
          <tr>
            <th>Time</th>
            <th>Temperature ({tempTrend})</th>
            <th>Humidity ({humidityTrend})</th>
          </tr>
        </thead>
        <tbody>
          {readings?.map((reading) => (
            <tr key={reading.id}>
              <td>{`${convertMinutesAgo(reading.createdAt)} ${
                convertMinutesAgo(reading.createdAt) === 1
                  ? "minute ago"
                  : "minutes ago"
              }`}</td>
              <td>{reading.temperature}</td>
              <td>{reading.humidity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
