//

// const User = require("../models/users.model");
//

// router.post(
//   "/register",

//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const user = new User({
//       email,
//       password: hashedPassword,
//       username,
//       firstName,
//       lastName,
//       birthDate,
//       bio,
//     });

//     try {
//       const savedUser = await user.save();
//
//       res.status(201).json({ token, user: savedUser });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   }
// );

// router.post(
//   "/login",
//   [
//     check("email", "L'email est obligatoire").isEmail(),
//     check("password", "Le mot de passe est obligatoire").isLength({ min: 6 }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Email ou mot de passe incorrect" });
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect) {
//       return res.status(400).json({ message: "Email ou mot de passe incorrect" });
//     }

//     const token = createToken(user);
//     res.status(200).json({ token, user });
//   }
// );
const express = require("express");
const router = express.Router();
const {
  createUser,
  login,
  usernameVerify,
  emailVerify
} = require("../controllers/user.controller.js");
const multer = require("multer");
const upload = require("../middleware/uploadProfilImageMiddleware");

router.get("/", async (req, res) => {});
router.get("/username/:id", usernameVerify);
router.get("/email/:id", emailVerify);
router.post("/login", login);

router.post("/register", upload.single("avatar"), createUser);

router.put("/", async (req, res) => {});

router.delete("/", async (req, res) => {});

module.exports = router;
