const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const expressJWT = require("express-jwt");
const connectDB = require("./db/db");
dotenv.config();

const app = express();
const port = process.env.PORT;
connectDB();

app.use(cors());

app.use(
  expressJWT({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }).unless({
    path: [
      /^\/user\/register/,
      /^\/user\/login/,
      /^\/user\/username\/.*/,
      /^\/user\/email\/.*/,
    ],
  })
);

// serveur de fichiers statiques
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes

app.use("/user", require("./routes/user.route"));

// lancer le serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
