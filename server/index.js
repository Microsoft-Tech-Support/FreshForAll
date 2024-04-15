const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
}));

const server = http.createServer(app);
server.listen(5000, "localhost", () => {
    console.log("Server running on port 5000!");
});