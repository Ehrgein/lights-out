import mongoose from "mongoose";

const { Schema, model } = mongoose;

const BajaEdesurSchema = new Schema({
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
  time: {
    type: String,
    required: false,
  },
});

const BajaEdesur = model("BajaEdesur", BajaEdesurSchema);

export default BajaEdesur;
