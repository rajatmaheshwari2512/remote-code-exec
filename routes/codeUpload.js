var express = require("express");
var fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
var randomstring = require("randomstring");

var cppRun = require("../languages/cpp");
var pythonRun = require("../languages/python");
var javaRun = require("../languages/java");
var goRun = require("../languages/go");
var { languageCode } = require("../shared/languageCode");
var { cppList } = require("../shared/blacklist");
var { pythonList } = require("../shared/blacklist");
var { javaList } = require("../shared/blacklist");
var { goList } = require("../shared/blacklist");
var validate = require("../shared/validate");

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
          exec(`rm ${name}.cpp`).then((resp) =>
            console.log("Input CPP Deleted")
          );
        }
      } else if (langid == 2) {
        if (validate(pythonList, code)) {
          pythonRun(input, res, name);
        } else {
          res.json({ error: "invalid code" });
          exec(`rm ${name}.py`).then((resp) => console.log("Input PY Deleted"));
        }
      } else if (langid == 3) {
        if (validate(javaList, code)) {
          javaRun(input, res, name);
        } else {
          res.json({ error: "invalid code" });
          exec(`rm ${name}.java`).then((resp) =>
            console.log("Input JAVA Deleted")
          );
        }
      } else if (langid == 4) {
        if (validate(goList, code)) {
          goRun(input, res, name);
        }
        else {
          res.json({ error: "invalid code" });
          exec(`rm ${name}.go`).then((resp) =>
            console.log("Input go Deleted")
          );
        }
      }
    });
  });
module.exports = router;
