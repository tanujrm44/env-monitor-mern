import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"
import TrendChart from "./components/Charts"
import Readings from "./components/Readings"
import axios from "axios"
import socket from "./utils/socket"

export default function App() {
  const [data, setData] = useState([])
  const [device, setDevice] = useState("device_001")
  const [filteredData, setFilteredData] = useState([])
  const [readings, setReadings] = useState([])

  console.log(readings)

  useEffect(() => {
    axios
      .get("/api/data/" + device)
      .then((response) => {
        setReadings(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error)
      })
  }, [device, data])

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server")
    })

    socket.on("data-update", (newData) => {
      console.log("Real-time data received:", newData)
      setData((prevData) => [newData, ...prevData].slice(0, 100)) // Keep last 100 readings
    })

    return () => {
      socket.off("data-update")
    }
  }, [])

  useEffect(() => {
    setFilteredData(data.filter((item) => item.deviceId === device))
  }, [data, device])

  return (
    <>
      <Navbar expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            Warehouse Environment Monitor
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown title="Devices" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => setDevice("device_001")}>
                  Device 1
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setDevice("device_002")}>
                  Device 2
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setDevice("device_003")}>
                  Device 3
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <h4 className="text-center mt-3">Device {device.slice(-1)}</h4>
        <Readings readings={readings} />
        <TrendChart data={filteredData} />
      </Container>
    </>
  )
}
