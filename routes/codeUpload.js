var express = require("express");
var fs = require("fs");
var { languageCode } = require("../shared/languageCode");
var router = express.Router();

router
  .get("/", (req, res, next) => {
    res.json({ APIWorking: true });
  })
  .post("/", (req, res, next) => {
    const code = req.body;
    console.log(code);
    console.log(languageCode[code.langid]);
    console.log(req.body.code);
    res.end();
  });
module.exports = router;
