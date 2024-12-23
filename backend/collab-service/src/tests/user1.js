// Room MUST be created first through website
// Connect to docker container's shell and run this file to emulate martinng01

const { io } = require('socket.io-client');

const socket = io('http://localhost:8888', {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('Connected to server with socket ID:', socket.id);

  // Register the user after connecting
  const userId = 'martinng01';
  socket.emit('register', userId);
  console.log(`User registered: ${userId}`);

  // Simulate sending a code change after registration
  setTimeout(() => {
    const codeChange = "console.log('Hello, World!');";
    console.log(`Sending code change: ${codeChange}`);
    socket.emit('code-change', codeChange);
  }, 1000);  // Delay the code-change event slightly to ensure registration is processed
});

// Handle disconnection
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('code-change', (data) => {
  console.log('Received code change:', data);
});

// Handle any error
socket.on('error', (err) => {
  console.error('Connection error:', err);
});
