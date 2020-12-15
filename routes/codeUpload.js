var express = require("express");
var fs = require("fs");

var router = express.Router();
router
  .get("/", (req, res, next) => {
    res.json({ APIWorking: true });
  })
  .post("/", (req, res, next) => {
    const code = req.body;
    fs.writeFile("input.txt", code, (err) => {
      if (err) return console.log(err);
      console.log(code);
    });
    res.json({ success: true });
  });
module.exports = router;
