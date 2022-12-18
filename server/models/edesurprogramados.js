import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProgramadosEdesurSchema = new Schema({
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
  tiempo: {
    type: String,
    required: false,
  },
  eta: {
    type: String,
    required: false,
  },

});

const ProgramadosEdesur = model("ProgramadosEdesur", ProgramadosEdesurSchema);

export default ProgramadosEdesur;
