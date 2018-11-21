var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.send({
    message: "Auth with JWT"
  });
});

router.get("/me", (req, res) => {

  /*
   *   Format Token
   *   x-access-token: Bearer <access_token>
   */

  var bearerHeader = req.headers["x-access-token"];
  if (typeof bearerHeader === "undefined")
    return res.status(401).send({
      auth: false,
      message: "Harus ada token dulu bosque"
    });

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];

  // Verify jwt / token
  jwt.verify(bearerToken, "secretkey", (err, authData) => {
    // Jika token salah
    if (err)
      return res.status(403).send({
        name: err.name,
        message: "Token salah"
      });
    // Jika token bener
    res.status(200).send({
      auth: true,
      data: authData,
      message: "Berhasil"
    });
  });
});

router.post("/login", (req, res) => {
  const { username, email } = req.body;

  // Dummy User
  const user = {
    id: Math.floor(Math.random() * 1000),
    username: username,
    email: email
  };

  // Cek jika body kosong
  if (username === undefined && email === undefined) {
    return res.send({
      message: "Username atau Email tidak boleh kosong bosque"
    });
  }

  jwt.sign({ user }, "secretkey", (err, token) => {
    res.send({
      auth: true,
      token: token
    });
  });
});

module.exports = router;
