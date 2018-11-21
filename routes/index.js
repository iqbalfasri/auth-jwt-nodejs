var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    message: "Belajar buat auth dengan JWT di NodeJS"
  });
});

module.exports = router;
