const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Event', EventSchema);

exports.getMyEvents = async (req, res) => {
  try {
    const { date, location } = req.query;
    let filter = { createdBy: req.user.id };  // Filter by current user
    
    if (date) filter.date = new Date(date);
    if (location) filter.location = location;

    const events = await Event.find(filter)
      .populate('createdBy', 'name email')
      .sort({ date: 1 });
      
    res.json(events);
  } catch (error) {
    console.error('Get my events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};