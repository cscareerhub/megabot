import mongoose from 'mongoose';

const FaqSchema = mongoose.Schema(
  {
    definition: { required: true, type: String },
    references: [String],
    term: { required: true, type: String }
  },
  { autoCreate: true, collections: 'Faq' }
);

let FaqModel = mongoose.model('Faq', FaqSchema);

export default FaqModel;
