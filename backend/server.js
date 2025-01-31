const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');


require('dotenv').config();

const app = express();

// Middleware - order is important!
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes - these should come after middleware
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);



// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/event-management';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Connected to MongoDB at ${MONGODB_URI}`))
  .catch(err => console.error("Could not connect to MongoDB:", err));

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

