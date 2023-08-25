import { Schema, model } from 'mongoose';

const profilePictureSchema = new Schema({
  src: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const profileDetailsSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: profilePictureSchema,
      required: true,
    },
  },
  { timestamps: true }
);

const ProfileDetails = model('ProfileDetails', profileDetailsSchema);

export default ProfileDetails;
