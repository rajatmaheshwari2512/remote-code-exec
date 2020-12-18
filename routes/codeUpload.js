const util = require("util");
const exec = util.promisify(require("child_process").exec);
var express = require("express");
var fs = require("fs");
var { languageCode } = require("../shared/languageCode");
var { pythonList } = require("../shared/blacklist");
var router = express.Router();
router.post("/", (req, res, next) => {
  const code = req.body.code;
  const langid = req.body.langid;
  const input = req.body.input;
  console.log(langid, input);
  fs.writeFile(`input.${languageCode[langid]}`, code, (err) => {
    if (err) res.json({ error: err });
    if (langid == 1) {
      if (!input) {
        exec("g++ input.cpp && ./a.out", { timeout: 5000, maxBuffer: 50000 })
          .then((result) => {
            res.json(result);
            exec("rm input.cpp && rm a.out").then((resp) =>
              console.log("CPP File Deleted")
            );
          })
          .catch((err) => {
            res.json(err);
            exec("rm input.cpp && rm a.out").then((resp) =>
              console.log("CPP File Deleted")
            );
          });
      } else {
        fs.writeFile("input.txt", input, (err) => {
          if (err) res.json({ error: err });
          exec("g++ input.cpp && ./a.out <input.txt", {
            timeout: 5000,
            maxBuffer: 50000,
          })
            .then((result) => {
              res.json(result);
              exec("rm input.cpp && rm a.out").then((resp) =>
                console.log("CPP File Deleted")
              );
              exec("rm input.txt").then((resp) =>
                console.log("Input CPP Deleted")
              );
            })
            .catch((err) => {
              res.json(err);
              exec("rm input.cpp && rm a.out").then((resp) =>
                console.log("CPP File Deleted")
              );
              exec("rm input.txt").then((resp) =>
                console.log("Input CPP Deleted")
              );
            });
        });
      }
    } else if (langid == 2) {
      if (!input) {
        exec("python input.py", { timeout: 10000, maxBuffer: 100000 })
          .then((result) => {
            res.json(result);
            exec("rm input.py").then((resp) => console.log("PY File Deleted"));
          })
          .catch((err) => {
            res.json(err);
            exec("rm input.py").then((resp) => console.log("PY File Deleted"));
          });
      } else {
        fs.writeFile("input.txt", input, (err) => {
          if (err) res.json({ error: err });
          exec("python input.py <input.txt", {
            timeout: 10000,
            maxBuffer: 100000,
          })
            .then((result) => {
              res.json(result);
              exec("rm input.py").then((resp) =>
                console.log("PY File Deleted")
              );
              exec("rm input.txt").then((resp) =>
                console.log("Input PY Deleted")
              );
            })
            .catch((err) => {
              res.json(err);
              exec("rm input.py").then((resp) =>
                console.log("PY File Deleted")
              );
              exec("rm input.txt").then((resp) =>
                console.log("Input PY Deleted")
              );
            });
        });
      }
    }
  });
});
module.exports = router;
