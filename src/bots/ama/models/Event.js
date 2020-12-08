import mongoose from 'mongoose';

const EventSchema = mongoose.Schema({
    title: String,
    date: Date
}, {collections: 'Event', autoCreate: true});

let EventModel = mongoose.model('Event', EventSchema);

export default EventModel;