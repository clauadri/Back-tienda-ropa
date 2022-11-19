const express = require("express");
const upload = require("../../middlewares/file");
const { isAuth,isAdmin } = require("../../middlewares/auth");
const Ropahombre = require("./ropaHombre.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allRopas = await Ropahombre.find();
    return res.status(200).json(allRopas);
  } catch (error) {
    return res.status(500).json("Error en el servidor");
  }
});

router.get("/:id", [isAuth], async (req, res) => {
  try {
    const id = req.params.id;
    const ropaToFind = await Ropahombre.findById(id);
    return res.status(200).json(ropaToFind);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/create", upload.single("imagen"), async (req, res) => {
  try {
    const ropa = req.body;
    // console.log(req.body);
    if(req.file){
      ropa.imagen = req.file.path;
    }
     console.log(req.body);
    const newRopa = new Ropahombre(ropa);
    console.log(newRopa);
    const created = await newRopa.save();
    console.log(created)
    return res.status(201).json(created);
  } catch (error) {
    return "error al crear ropa", error;
  }
});

router.delete("/delete/:id", [isAuth], async (req, res) => {
  try {
    const id = req.params.id;
    await Ropahombre.findByIdAndDelete(id);
    return res.status(200).json("Se ha conseguido borrar la ropa");
  } catch (error) {
    return res.status(500).json("Error al borrar la ropa");
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const ropa = req.body;
    const ropaModify = new Ropahombre(ropa);
    ropaModify._id = id;
    const ropaUpdated = await Ropahombre.findByIdAndUpdate(
      id,
      ropaModify
    );
    return res
      .status(200)
      .json({
        mensaje: "Se ha conseguido editar la ropa",
        ropaModificado: ropaUpdated,
      });
  } catch (error) {
    return res.status(500).json("Error al editar la ropa");
  }
});

module.exports = router;