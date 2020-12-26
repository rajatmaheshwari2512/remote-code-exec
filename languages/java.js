const util = require("util");
const exec = util.promisify(require("child_process").exec);
var fs = require("fs");

const java = (input, res, name) => {
  fs.writeFile(`${name}.txt`, input, (err) => {
    if (err) res.json({ error: err });
    exec("docker run -d -it java:v1 /bin/bash").then((resp) => {
      var id = resp.stdout.substring(0, 12);
      exec(
        `docker cp ${name}.java ${id}:/usr/src/app/test.java && docker cp ${name}.txt ${id}:/usr/src/app/input.txt && docker exec ${id} bash -c "javac test.java && java test<input.txt"`,
        { timeout: 15000, maxBuffer: 50000 }
      )
        .then((resp) => {
          res.json(resp);
          exec(`rm ${name}.java && rm ${name}.txt`).then((resp) =>
            console.log("Files removed")
          );
          exec(`docker kill ${id}`).then((resp) =>
            console.log("Container Stopped")
          );
        })
        .catch((err) => {
          res.json(err);
          exec(`rm ${name}.java && rm ${name}.txt`).then((resp) =>
            console.log("Files removed")
          );
          exec(`docker kill ${id}`).then((resp) =>
            console.log("Container Stopped")
          );
        });
    });
  });
};
module.exports = java;
