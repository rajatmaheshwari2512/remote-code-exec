var express = require("express");
var cmd = require("node-cmd");
var fs = require("fs");
var { languageCode } = require("../shared/languageCode");
var router = express.Router();
var output;
router.post("/", (req, res, next) => {
  const code = req.body.code;
  const langid = req.body.langid;
  const input = req.body.input;
  fs.writeFileSync(`input.${languageCode[langid]}`, code, (err) => {
    if (err) return console.log(err);
  });
  if (langid == 1) {
    if (input == null) output = cmd.runSync("g++ input.cpp && ./a.out");
    else {
      fs.writeFileSync("input.txt", input, (err) => {
        if (err) return console.log(err);
      });
      output = cmd.runSync("g++ input.cpp && ./a.out <input.txt");
      cmd.runSync("rm input.txt");
    }
  } else if (req.body.langid == 2) {
    if (input == null) output = cmd.runSync("python input.py");
    else {
      fs.writeFileSync("input.txt", input, (err) => {
        if (err) return console.log(err);
      });
      output = cmd.runSync("python input.py <input.txt");
      cmd.runSync("rm input.txt");
    }
  }
  res.json({ output });
  cmd.runSync(`rm input.${languageCode[langid]}`);
  if (langid == 1) {
    cmd.runSync("rm a.out");
  }
  res.end();
});
module.exports = router;
