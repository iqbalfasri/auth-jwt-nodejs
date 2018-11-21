var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send({
    message: "Auth"
  });
});

router.post('/login', (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: 'iqbalfasri',
    email: 'iqbalx64@gmail.com'
  };
  jwt.sign({user: user}, 'secretkey', (err, token) => {
    res.json({
      token: token
    })
  })
})

module.exports = router;
