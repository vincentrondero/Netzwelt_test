const express = require('express');
const http = require('http');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json()); 

const mockedUser = {
  username: 'foo',
  password: 'bar',
};

app.post('/api/authenticate', (req, res) => {
  const { username, password } = req.body;

  if (username === mockedUser.username && password === mockedUser.password) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
});

app.get('/api/Territories/All', async (req, res) => {
  try {
    const response = await axios.get('https://netzwelt-devtest.azurewebsites.net/Territories/All');
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying API request:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
