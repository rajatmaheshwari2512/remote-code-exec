const util = require("util");
const exec = util.promisify(require("child_process").exec);
var fs = require("fs");

const cpp = (input, res) => {
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
        exec("rm input.txt").then((resp) => console.log("Input CPP Deleted"));
      })
      .catch((err) => {
        res.json(err);
        exec("rm input.cpp").then((resp) => console.log("CPP File Deleted"));
        exec("rm input.txt").then((resp) => console.log("Input CPP Deleted"));
      });
  });
};
module.exports = cpp;
