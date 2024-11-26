import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Navbar, Nav, NavDropdown, Form } from "react-bootstrap"
import TrendChart from "./components/Charts"
import Readings from "./components/Readings"
import axios from "axios"
import socket from "./utils/socket"

export default function App() {
  const [device, setDevice] = useState("device_001")
  const [readings, setReadings] = useState([])
  const [switchState, setSwitchState] = useState(false)

  // Fetch initial data for the selected device
  useEffect(() => {
    axios
      .get("/api/data/" + device)
      .then((response) => {
        setReadings(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error)
      })
  }, [device])

  // Emit switch state to the server
  useEffect(() => {
    socket.emit("switch", switchState ? "on" : "off")
  }, [switchState])

  // Handle real-time data updates
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server")
    })

    socket.on("data-update", (newData) => {
      console.log("Real-time data received:", newData)
      setReadings((prevReadings) => [newData, ...prevReadings].slice(0, 100)) // Keep only the latest 100 readings
    })

    return () => {
      socket.off("data-update")
    }
  }, [])

  // Filter readings for the selected device
  const filteredReadings = readings.filter((item) => item.deviceId === device)

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
        <div className="d-flex align-items-center justify-content-center gap-3">
          <h4 className="text-center mt-3">Device {device.slice(-1)}</h4>
          <Form.Check
            size={"lg"}
            type="switch"
            id="custom-switch"
            checked={switchState}
            onChange={(e) => setSwitchState(e.target.checked)}
            label={switchState ? "Turn Off" : "Turn On"}
          />
        </div>
        <Readings readings={filteredReadings} />
        <TrendChart data={filteredReadings} />
      </Container>
    </>
  )
}
