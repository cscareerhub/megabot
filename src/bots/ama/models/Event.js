import mongoose from 'mongoose';

const EventSchema = mongoose.Schema(
  {
    date: Date,
    title: String
  },
  { autoCreate: true, collections: 'Event' }
);

let EventModel = mongoose.model('Event', EventSchema);

export default EventModel;
