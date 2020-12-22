const util = require("util");
const exec = util.promisify(require("child_process").exec);
var fs = require("fs");

const cpp = (input, res, name) => {
  fs.writeFile(`${name}.txt`, input, (err) => {
    if (err) res.json({ error: err });
    exec(`g++ -o ${name} ${name}.cpp && ./${name} <${name}.txt`, {
      timeout: 5000,
      maxBuffer: 50000,
    })
      .then((result) => {
        res.json(result);
        exec(`rm ${name}.cpp && rm ${name}`).then((resp) =>
          console.log("CPP File Deleted")
        );
        exec(`rm ${name}.txt`).then((resp) => console.log("Input CPP Deleted"));
      })
      .catch((err) => {
        res.json(err);
        exec(`rm ${name}.cpp`).then((resp) => console.log("CPP File Deleted"));
        exec(`rm ${name}.txt`).then((resp) => console.log("Input CPP Deleted"));
      });
  });
};
module.exports = cpp;
