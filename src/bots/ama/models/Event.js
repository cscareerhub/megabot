import mongoose from 'mongoose';

const EventSchema = mongoose.Schema(
  {
    date: { required: true, type: Date },
    description: String,
    participants: [String],
    title: { required: true, type: String },
    url: String
  },
  { autoCreate: true, collections: 'Event' }
);

let EventModel = mongoose.model('Event', EventSchema);

export default EventModel;
