const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// intitialize express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// connect to routes
const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

// connect to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server connected on port ${PORT}`))