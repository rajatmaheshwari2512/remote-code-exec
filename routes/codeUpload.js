var express = require("express");
var fs = require("fs");

var cppRun = require("../languages/cpp");
var pythonRun = require("../languages/python");
var { languageCode } = require("../shared/languageCode");
var { cppList } = require("../shared/blacklist");

var router = express.Router();

router
  .get("/", (req, res, next) => {
    res.json({ APIWorking: true });
  })
  .post("/", (req, res, next) => {
    const code = req.body.code;
    const langid = req.body.langid;
    const input = req.body.input;
    fs.writeFile(`input.${languageCode[langid]}`, code, (err) => {
      if (err) res.json({ error: err });
      if (langid == 1) {
        cppRun(input, res);
      } else if (langid == 2) {
        pythonRun(input, res);
      }
    });
  });
module.exports = router;
