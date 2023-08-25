import { Schema, model } from 'mongoose';

const linkSchema = new Schema({
  platform: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const linksSchema = new Schema(
  {
    links: [linkSchema],
  },
  { timestamps: true }
);

const Links = model('Links', linksSchema);

export default Links;
