const mongoose = require("mongoose");

const ropaMujerSchema = new mongoose.Schema(
  {
    tipo: { type: String, trim: true, required: true },
    precio: { type: Number, trim: true, required: true },
    imagen: { type: String, trim: true, required: true },
    talla: { type: String, trim: true,enum:['XS','S','M','L','XL','XXL'] }
  },
  { timestamps: true, collection: "ropasmujer" }
);

const Ropamujer = mongoose.model("ropasmujer", ropaMujerSchema);
module.exports = Ropamujer;
