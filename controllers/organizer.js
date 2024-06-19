// instruction: import the organizer model
const Organizer = require("../models/organizer");

const getOrganizers = async () => {
  // instruction: Write the codes to retrieve all organizers
  try {
    const organizers = await Organizer.find();
    return organizers;
  } catch (error) {
    throw new Error(error);
  }
};

const getOrganizer = async (id) => {
  // instruction: write the codes to retrieve a specific organizer
  const organizer = await Organizer.findById(id);
  return organizer;
};

const AddNewOrganizer = async (name, bio, contact, eventsOrganized) => {
  // instruction: write the codes to add an organizer
  const newOrganizer = new Organizer({
    name,
    bio,
    contact,
    eventsOrganized,
  });
  await newOrganizer.save();
  return newOrganizer;
};

const updateOrganizer = async (
  organizer_id,
  name,
  bio,
  contact,
  eventsOrganized
) => {
  // instruction: write the codes to update an organizer
  const updatedOrganizer = await Organizer.findByIdAndUpdate(
    organizer_id,
    name,
    bio,
    contact,
    eventsOrganized,
    { new: true }
  );
  return updateOrganizer;
};

const deleteOrganizer = async (id) => {
  // instruction: write the codes to delete an organizer
  return await Organizer.findByIdAndDelete(id);
};

module.exports = {
  getOrganizers,
  getOrganizer,
  AddNewOrganizer,
  updateOrganizer,
  deleteOrganizer,
};
