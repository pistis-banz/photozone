const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("middleware");
  console.log(req.header.authorization);
  const authorizationHeader = req.header.authorization;

  if (!authorizationHeader) {
    const message = "aucun jeton n'a été trouvé";
    console.log(message);
    return res.status(401).json({ message });
  }

  const token = authorizationHeader.split(".")[1];
  const decodedToken = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (error, decodedToken) => {
      if (error) {
        const message =
          "l'utilisateur n'est pas autorisé à acceder à cette ressource";
        console.log(message);
        return res.status(401).json({ message });
      }

      const userId = decodedToken.id;

      if (req.body.userid && req.body.userid !== userId) {
        const message = "l'indentifiant de l'utilisateur n'est pas valide";
        console.log(message);
        return res.status(401).json({ message });
      }
      console.log("reussi");
      next();
    }
  );
};
