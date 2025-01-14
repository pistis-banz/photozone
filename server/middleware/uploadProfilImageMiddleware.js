const multer = require("multer");
const path = require("path");
const fs = require("fs");

let username;
// Configuration Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Obtenir le nom d'utilisateur

    username = req.body.username;
    // creation du dossier des photos de profil (original et miniature)

    const profilImagePath = path.join(
      __dirname,
      "../uploads",
      "users",
      username,
      "profilImage"
    );
    if (!fs.existsSync(profilImagePath)) {
      fs.mkdirSync(profilImagePath, { recursive: true });
    }

    cb(null, profilImagePath);
  },
  filename: (req, file, cb) => {
    const filename =
      "profilImage" +
      file.originalname.slice(file.originalname.lastIndexOf("."));
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const mimeTypes = ["image/jpeg", "image/png"];
  if (mimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers JPEG et PNG sont autorisés."));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

module.exports = upload;
