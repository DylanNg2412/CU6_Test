const express = require("express");
const router = express.Router();

// instruction: import all the necessary functions from controllers/event.js
const {
  getEvents,
  getEvent,
  AddNewEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event");
const Event = require("../models/event");

// instruction: import all the necessary functions from controllers/feedback.js
const {
  getFeedbacksByEvent,
  AddNewFeedback,
} = require("../controllers/feedback");

// instruction: `GET /events`: List all events
router.get("/", async (req, res) => {
  try {
    const events = await getEvents();
    res.status(200).send(events);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// instruction: `GET /events/:id`: Get a specific event by its id
router.get("/:id", async (req, res) => {
  try {
    const event = await getEvent(req.params.id);
    if (event) {
      res.status(200).send(event);
    } else {
      res.status(404).send("Event Not Found");
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// instruction: `POST /events`: Add a new event
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const organizer = req.body.organizer;
    const date = req.body.date;
    const location = req.body.location;
    const category = req.body.category;
    const description = req.body.description;
    const attendeeCount = req.body.attendeeCount;
    const newEvent = await AddNewEvent(
      title,
      organizer,
      date,
      location,
      category,
      description,
      attendeeCount
    );
    res.status(200).send(newEvent);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// instruction: `PUT /events/:id`: Update an event
router.put("/:id", async (req, res) => {
  try {
    const event_id = req.params.id;
    const title = req.body.title;
    const organizer = req.body.organizer;
    const date = req.body.date;
    const location = req.body.location;
    const category = req.body.category;
    const description = req.body.description;
    const attendeeCount = req.body.attendeeCount;
    const updatedEvent = await updateEvent(
      event_id,
      title,
      organizer,
      date,
      location,
      category,
      description,
      attendeeCount
    );
    const event = await Event.findById(event_id);
    res.status(200).send(event);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// instruction: `DELETE /events/:id`: Delete an event
router.delete("/:id", async (req, res) => {
  try {
    const event_id = req.params.id;
    await deleteEvent(event_id);
    res.status(200).send("Event deleted");
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// instruction: `GET /events/:id/feedback`: Get all feedback for a specific event by its id
router.get("/events/:id/feedback", async (req, res) => {
  try {
    const feedback = await getFeedbacksByEvent(req.params.id);
    if (feedback) {
      res.status(200).send(feedback);
    } else {
      res.status(404).send("Feedback Not Found");
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// instruction: `POST /events/:id/feedback`: Add feedback for a specific event by its id
router.post("/events/:id/feedback", async (req, res) => {
  try {
    const event = req.body.event;
    const attendeeCount = req.body.attendeeCount;
    const comment = req.body.comment;
    const newFeedback = await AddNewFeedback(event, attendeeCount, comment);
    res.status(200).send(newFeedback);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
