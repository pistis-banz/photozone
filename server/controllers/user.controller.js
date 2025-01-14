// const User = require("../models/users.model");

// exports.getUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getUserByEmail = async (req, res) => {
//   const { email } = req.params;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.updateUser = async (req, res) => {
//   const { id } = req.params;
//   const { email, password, username, firstName, lastName, birthDate, bio, avatar } = req.body;

//   try {
//     const user = await User.findByIdAndUpdate(id, {
//       email,
//       password,
//       username,
//       firstName,
//       lastName,
//       birthDate,
//       bio,
//       avatar,
//     });
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//     console.log(err);
//   }
// };

// exports.deleteUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findByIdAndDelete(id);
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const usersModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/jwt");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

// Récupérer tous les utilisateurs (admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Récupérer un utilisateur par son id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// connection d'un utilisateur
module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await usersModel.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ error: "mot de passse ou nom d'utilisateur incorrect" });
    }

    const token = createToken(user);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

// Créer un utilisateur
module.exports.createUser = async (req, res) => {
  // controle des données
  console.log("debug1");
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.username ||
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.birthdate ||
    !req.body.gender
  ) {
    return res.status(400).json({ success: false, message: "missing data" });
  }

  let { email, password, username, firstname, lastname, gender, birthdate } =
    req.body;
  console.log("debug2");
  firstname = firstname.toLowerCase();
  firstname = firstname.trim();
  lastname = lastname.toLowerCase();
  lastname = lastname.trim();
  username = username.toLowerCase();
  username = username.trim();

  const existingUsername = await usersModel.findOne({ username });
  if (existingUsername) {
    return res.status(400).json({ message: "pseudo déjà utilisé" });
  }
  const existingUser = await usersModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "L'email est déjà utilisé." });
  }
  console.log("debug3");
  if (gender !== "male" && gender !== "female") {
    return res.status(400).json({ message: "genre incorrect" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const avatar = req.file ? req.file.path : null;
  console.log("debug4");
  // creation de la miniature de l'image
  if (req.file) {
    const image = await sharp(req.file.path)
      .resize(200, 200)
      .toFile(
        path.join(
          __dirname,
          "../uploads/users",
          username,
          "profilImage",
          "miniature.jpg"
        )
      );
  }
  try {
    const newUser = new usersModel({
      email,
      password: hashedPassword,
      username,
      firstname,
      lastname,
      birthdate,
      gender,
      avatar,
    });

    newUser.save();
    //envoie du token
    const token = createToken(newUser);
    res.status(201).json({ token });
  } catch (e) {
    console.log(e);
  }
};

exports.usernameVerify = async (req, res) => {
  try {
    const user = await usersModel.findOne({ username: req.params.id });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User is already exist" });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.emailVerify = async (req, res) => {
  try {
    const user = await usersModel.findOne({ email: req.params.id });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "this email is already exist" });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
