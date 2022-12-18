import mongoose from "mongoose";

const { Schema, model } = mongoose;

const MediaEdesurSchema = new Schema({
  partido: {
    type: String,
    required: false,
  },
  localidad: {
    type: String,
    required: false,
  },
  alimentador: {
    type: String,
    required: false,
  },
  afectados: {
    type: Number,
    required: false,
  },
  eta: {
    type: String,
    required: false,
  },
});

const MediaEdesur = model("MediaEdesur", MediaEdesurSchema);

export default MediaEdesur;
