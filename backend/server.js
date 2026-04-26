const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Socket.io for real-time game state updates
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join-game', (data) => {
    socket.join(data.gameId);
    io.to(data.gameId).emit('player-joined', { playerId: socket.id });
  });

  socket.on('game-state', (data) => {
    socket.to(data.gameId).emit('game-state-update', data.state);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
