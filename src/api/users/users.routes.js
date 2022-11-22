const express = require("express");
const User = require("./users.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt/jwt");
const { isAuth, isAdmin } = require("../../middlewares/auth");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    
    return res.status(500).json("Error al leer los usuarios");
  }
});

router.post("/register", async (req, res, next) => {
  try {
    // const user = req.body;
    console.log(req.body)
    const newUser = new User(req.body);
    console.log('',newUser);
    const created = await newUser.save();
    console.log(created);
    return res.status(201).json(created);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userDB = await User.findOne({ email: req.body.email });
    console.log(userDB);
    if (!userDB) {
      return res.status(404).json("No existe el usuario");
    }
    if (bcrypt.compareSync(req.body.password, userDB.password)) {
      
      const token = generateSign(userDB._id, userDB.email);
     
      return res.status(200).json({ token, userDB });
    } else {
      return res.status(200).json("La contraseña es incorrecta maquina");
    }
  } catch (error) {
    return res.status(500).json("Error al loguear el usuario");
  }
});


router.post("/logout", async (req, res) => {
  try {
    const token = null;
    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/checksession", [isAuth], (req, res, next) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/checksession", (req, res, next) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json(error);
  }
});
module.exports = router;
