const mongoose = require("mongoose");

const ropaHombreSchema = new mongoose.Schema(
  {
    tipo: { type: String, trim: true, required: true },
    precio: { type: Number, trim: true, required: true },
    imagen: { type: String, trim: true, required: true },
    talla: { type: String, trim: true,enum:['XS','S','M','L','XL','XXL'] }
  },
  { timestamps: true, collection: "ropashombre" }
);

const Ropahombre = mongoose.model("ropashombres", ropaHombreSchema);
module.exports = Ropahombre;