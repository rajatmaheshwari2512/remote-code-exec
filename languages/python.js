const util = require("util");
const exec = util.promisify(require("child_process").exec);
var fs = require("fs");

const python = (input, res, name) => {
  fs.writeFile(`${name}.txt`, input, (err) => {
    if (err) res.json({ error: err });
    exec(`python3 ${name}.py <${name}.txt`, {
      timeout: 10000,
      maxBuffer: 100000,
    })
      .then((result) => {
        res.json(result);
        exec(`rm ${name}.py`).then((resp) => console.log("PY File Deleted"));
        exec(`rm ${name}.txt`).then((resp) => console.log("Input PY Deleted"));
      })
      .catch((err) => {
        res.json(err);
        exec(`rm ${name}.py`).then((resp) => console.log("PY File Deleted"));
        exec(`rm ${name}.txt`).then((resp) => console.log("Input PY Deleted"));
      });
  });
};
module.exports = python;
