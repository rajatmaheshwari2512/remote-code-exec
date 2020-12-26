const util = require("util");
const exec = util.promisify(require("child_process").exec);
var fs = require("fs");

const python = (input, res, name) => {
  fs.writeFile(`${name}.txt`, input, (err) => {
    if (err) res.json({ error: err });
    exec("docker run -d -it python:v1 /bin/bash").then((resp) => {
      var id = resp.stdout.substring(0, 12);
      exec(
        `docker cp ${name}.py ${id}:/usr/src/app/test.py && docker cp ${name}.txt ${id}:/usr/src/app/input.txt && docker exec ${id} bash -c "python3 test.py<input.txt"`,
        { timeout: 20000, maxBuffer: 50000 }
      )
        .then((resp) => {
          res.json(resp);
          exec(`rm ${name}.py && rm ${name}.txt`).then((resp) =>
            console.log("Files removed")
          );
          exec(`docker kill ${id}`).then((resp) =>
            console.log("Container Stopped")
          );
        })
        .catch((err) => {
          res.json(err);
          exec(`rm ${name}.py && rm ${name}.txt`).then((resp) =>
            console.log("Files removed")
          );
          exec(`docker kill ${id}`).then((resp) =>
            console.log("Container Stopped")
          );
        });
    });
  });
};
module.exports = python;
