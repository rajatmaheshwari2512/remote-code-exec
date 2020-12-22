var express = require("express");
var fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

var cppRun = require("../languages/cpp");
var pythonRun = require("../languages/python");
var { languageCode } = require("../shared/languageCode");
var { cppList } = require("../shared/blacklist");
var { pythonList } = require("../shared/blacklist");
var validate = require("../shared/validate");
var randomstring = require("randomstring");

var router = express.Router();

router
  .get("/", (req, res, next) => {
    res.json({ APIWorking: true });
  })
  .post("/", (req, res, next) => {
    const code = req.body.code;
    const langid = req.body.langid;
    const input = req.body.input;
    var name = randomstring.generate({
      length: 7,
      charset: "alphabetic",
    });
    fs.writeFile(`${name}.${languageCode[langid]}`, code, (err) => {
      if (err) res.json({ error: err });
      if (langid == 1) {
        if (validate(cppList, code)) {
          cppRun(input, res, name);
        } else {
          res.json({ error: "invalid code" });
          exec("rm input.cpp").then((resp) => console.log("Input CPP Deleted"));
        }
      } else if (langid == 2) {
        if (validate(pythonList, code)) {
          pythonRun(input, res, name);
        } else {
          res.json({ error: "invalid code" });
          exec("rm input.py").then((resp) => console.log("Input PY Deleted"));
        }
      }
    });
  });
module.exports = router;
