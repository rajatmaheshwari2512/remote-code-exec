var express = require("express");
var cmd = require("node-cmd");
var fs = require("fs");
var { languageCode } = require("../shared/languageCode");
var router = express.Router();
var output;
router.post("/", (req, res, next) => {
  const code = req.body.code;
  fs.writeFileSync(`input.${languageCode[req.body.langid]}`, code, (err) => {
    if (err) return console.log(err);
  });
  if (req.body.langid == 1) {
    output = cmd.runSync("g++ input.cpp && ./a.out");
  } else if (req.body.langid == 2) {
    output = cmd.runSync("python input.py");
  }
  console.log(output);
  res.json({ output });
  cmd.runSync(`rm input.${languageCode[req.body.langid]}`);
  if (req.body.langid == 1) {
    cmd.runSync("rm a.out");
  }
  res.end();
});
module.exports = router;
