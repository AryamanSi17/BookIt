const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authenticate = require("../middleware/authenticate");

// Public routes (no authentication required)
router.get('/bookings', bookingController.getBookings);
router.get('/events', bookingController.getEvents);
router.get('/bookingsView/:bookingId', bookingController.getBookingById);
router.post('/bookings', bookingController.createBooking);

// Routes requiring authentication (HOD and Admin)
router.get('/bookingsAdmin', authenticate, bookingController.getBookingAdmin);
router.get('/bookingsHod', authenticate, bookingController.getBookingHod);
router.get('/bookingsFaculty', authenticate, bookingController.getBookingByUserId);
router.put('/bookingsEdit/:bookingId', authenticate, bookingController.updateBooking);
router.delete('/bookings/:bookingId', authenticate, bookingController.deleteBooking);

module.exports = router;
