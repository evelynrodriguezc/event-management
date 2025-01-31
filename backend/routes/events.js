const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const eventController = require('../controllers/eventController');

router.get('/', eventController.getEvents);
router.get('/my/events', auth, eventController.getMyEvents);
router.get('/:id', eventController.getEventById);

router.post('/', auth, eventController.createEvent);
router.put('/:id', auth, eventController.updateEvent);
router.delete('/:id', auth, eventController.deleteEvent);

module.exports = router;
