var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
router
  .get("/", (req, res, next) => {
    res.json({ APIWorking: true });
  })
  .post("/", (req, res, next) => {
    const code = req.body;
    console.log(code);
    res.json({ success: true });
  });
module.exports = router;
