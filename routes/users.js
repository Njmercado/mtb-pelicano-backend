const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "ohla",
    error: false
  })
});

router.post('/charge', (req, res, next) => {
  res.json({
    message: '',
    error: false
  })
})

module.exports = router;
