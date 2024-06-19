// instruction: import the feedback model
const Feedback = require("../models/feedback");

const getFeedbacksByEvent = async (eventId) => {
  // instruction: write the codes to retrieve all feedbacks by eventId
  const feedback = await Feedback.find(eventId);
  return feedback;
};

const AddNewFeedback = async (event, attendeeName, comment) => {
  // instruction: write the codes to add new feedback for an event
  const newFeedback = new Feedback({
    event,
    attendeeName,
    comment,
  });
  await newFeedback.save();
  return newFeedback;
};

module.exports = {
  getFeedbacksByEvent,
  AddNewFeedback,
};
