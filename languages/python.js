const util = require("util");
const exec = util.promisify(require("child_process").exec);
var fs = require("fs");

const python = (input, res) => {
  console.log("Input");
  fs.writeFile("input.txt", input, (err) => {
    if (err) res.json({ error: err });
    exec("python input.py <input.txt", {
      timeout: 10000,
      maxBuffer: 100000,
    })
      .then((result) => {
        res.json(result);
        exec("rm input.py").then((resp) => console.log("PY File Deleted"));
        exec("rm input.txt").then((resp) => console.log("Input PY Deleted"));
      })
      .catch((err) => {
        res.json(err);
        exec("rm input.py").then((resp) => console.log("PY File Deleted"));
        exec("rm input.txt").then((resp) => console.log("Input PY Deleted"));
      });
  });
};
module.exports = python;
