const Event = require('../models/Event');

const formatDateForDB = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    // Adjust for timezone offset
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

const eventController = {
  // Get All Events
  getEvents: async (req, res) => {
    try {
      const { date, location } = req.query;
      let filter = {};
      
      if (date) {
        const searchDate = formatDateForDB(date);
        console.log('Searching for date:', searchDate);
        filter.date = searchDate;
      }
      
      if (location) {
        filter.location = { $regex: location, $options: 'i' };
      }

      const events = await Event.find(filter)
        .populate('createdBy', 'name email')
        .sort({ date: 1 });
        
      res.json(events);
    } catch (error) {
      console.error('Get events error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getEventById: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.json(event);  // This sends back the event data
    } catch (error) {
      console.error('Get event by id error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  

  // Get My Events
  getMyEvents: async (req, res) => {
    try {
      const { date, location } = req.query;
      let filter = { createdBy: req.user.id };
      
      if (date) {
        const searchDate = formatDateForDB(date);
        console.log('Searching for date:', searchDate);
        filter.date = searchDate;
      }
      
      if (location) {
        filter.location = { $regex: location, $options: 'i' };
      }

      const events = await Event.find(filter)
        .populate('createdBy', 'name email')
        .sort({ date: 1 });
        
      res.json(events);
    } catch (error) {
      console.error('Get my events error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Create Event
  createEvent: async (req, res) => {
    try {
      const { name, date, time, location, description } = req.body;
      const formattedDate = formatDateForDB(date);
      
      const event = new Event({ 
        name, 
        date: formattedDate, 
        time, 
        location, 
        description, 
        createdBy: req.user.id 
      });

      await event.save();
      res.status(201).json(event);
    } catch (error) {
      console.error('Create event error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

// Update Event
updateEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      if (event.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      // Format date if it exists in the request body
      const updatedData = { ...req.body };
      if (updatedData.date) {
        updatedData.date = formatDateForDB(updatedData.date);
      }
  
      const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id, 
        updatedData, 
        { new: true, runValidators: true }
      );
      res.json(updatedEvent);  // This sends back the updated event
    } catch (error) {
      console.error('Update event error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  
  // Delete Event
  deleteEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      if (event.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      await Event.findByIdAndDelete(req.params.id);
      res.json({ message: 'Event deleted', eventId: req.params.id });  // This sends back confirmation and the deleted event's ID
    } catch (error) {
      console.error('Delete event error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = eventController;