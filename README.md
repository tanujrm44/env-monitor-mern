# Warehouse Environment Monitor

## Description

This project is a real-time monitoring system for tracking environmental parameters such as temperature and humidity in a warehouse. It uses WebSocket for real-time data updates, Redis for pub/sub messaging, MongoDB for persistent storage, and a modern front-end built with React and Bootstrap.

## Prerequisites

Before running the project, you need to have the following installed on your machine:

- [Node.js](https://nodejs.org/) - version 20.11.0
- [Git](https://git-scm.com/)
- [Redis] (5.x or higher)

## Installation

1. Clone the repository:

```
   git clone https://github.com/tanujrm44/env-monitor-mern.git
```

2. Install dependencies:

```
   npm install
```

3. Configure Environment Variables

```
    MONGO_URI=mongodb://localhost:27017/warehouse
    REDIS_URL=redis://127.0.0.1:6379
    PORT=5000
```

4. Run the development server:

```
   npm run dev
```

2. Open your browser and navigate to http://localhost:3000 to view the project.

## Folder Structure

```
warehouse-environment-monitor/
│
├── client/               # React front-end
│   ├── public/           # Static assets
│   ├── src/              # React components
│   ├── utils/            # Helper functions (e.g., socket connection)
│   └── package.json      # Frontend dependencies
│
├── server/               # Node.js backend
│   ├── controllers/      # API logic
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── utils/            # Redis configuration and helpers
│   ├── app.js            # Express app setup
│   └── package.json      # Backend dependencies
│
├── .env                  # Environment variables
├── README.md             # Project documentation
└── package.json          # Root dependencies and scripts
```

## Libraries Used

This project utilizes various technologies and libraries to achieve its functionality. Here's a list of key technologies used:

##### Backend

- Express: Web framework for Node.js.
- Redis: For Pub/Sub messaging.
- MongoDB: Database for persistent storage.
- Socket.IO: WebSocket implementation for real-time communication.

##### Frontend

- React: JavaScript library for building the user interface.
- Bootstrap: For responsive and modern UI components.
- React-Bootstrap: React components built with Bootstrap.

### Redis and WebSockets Usage

Redis is used as a Pub/Sub messaging system to publish environmental data from devices at regular intervals. This data is then consumed by the WebSocket server, which broadcasts the updates in real-time to all connected clients using Socket.IO. This ensures that the application remains responsive and provides live updates for temperature and humidity readings without requiring manual refreshes. The combination of Redis and WebSockets offers a scalable and efficient solution for handling real-time data streams.
