// instruction: import the event model
const Event = require("../models/event");

const getEvents = async () => {
  // instruction: write the codes to retrieve all events (use `populate()` to get organizer details)
  try {
    const events = await Event.find().populate("organizer");
    return events;
  } catch (error) {
    throw new Error(error);
  }
};

const getEvent = async (id) => {
  // instruction: write the codes to retrieve a specific event (use `populate()` to get organizer details)
  const event = await Event.findById(id).populate("organizer");
  return event;
};

const AddNewEvent = async (
  title,
  organizer,
  date,
  location,
  category,
  description,
  attendeeCount
) => {
  // instruction: write the codes to add a new event
  const newEvent = new Event({
    title,
    organizer,
    date,
    location,
    category,
    description,
    attendeeCount,
  });
  await newEvent.save();
  return newEvent;
};

const updateEvent = async (
  event_id,
  title,
  organizer,
  date,
  location,
  category,
  description,
  attendeeCount
) => {
  // instruction: write the codes to update an event
  const updatedEvent = await Event.findByIdAndUpdate(
    event_id,
    {
      title,
      organizer,
      date,
      location,
      category,
      description,
      attendeeCount,
    },
    { new: true }
  );
  return updatedEvent;
};

const deleteEvent = async (id) => {
  // instruction: Write the codes to delete an event
  return await Event.findByIdAndDelete(id);
};

module.exports = {
  getEvents,
  getEvent,
  AddNewEvent,
  updateEvent,
  deleteEvent,
};
