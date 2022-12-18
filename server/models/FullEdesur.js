import mongoose from "mongoose";

const { Schema, model } = mongoose;

const FullEdesurSchema = new Schema({
  mediaedesur: {
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
  },
  bajaedesur: {
    partido: {
      type: String,
      required: false,
    },
    localidad: {
      type: String,
      required: false,
    },
    afectados: {
      type: Number,
      required: false,
    },
  },
});

const FullEdesur = model("FullEdesur", FullEdesurSchema);

export default FullEdesur;
