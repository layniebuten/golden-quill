import { Schema, model } from 'mongoose';

const blurbSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
});

const Blurb = model('blurb', blurbSchema);

export default Blurb;
