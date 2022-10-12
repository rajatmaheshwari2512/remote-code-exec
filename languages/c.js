const util = require("util");
const exec = util.promisify(require("child_process").exec);
let fs = require("fs");

const c = (input, res, name) => {
  fs.writeFile(`${name}.txt`, input, (err) => {
    if (err) res.json({ error: err });
    exec("docker run -d -it c:v1 /bin/bash").then((resp) => {
      let id = resp.stdout.substring(0, 12);
      exec(
        `docker cp ${name}.c ${id}:/usr/src/app/test.c && docker cp ${name}.txt ${id}:/usr/src/app/input.txt && docker exec ${id} bash -c "gcc test.c && ./a.out<input.txt"`,
        { timeout: 10000, maxBuffer: 50000 }
      )
        .then((resp) => {
          res.json(resp);
          exec(`rm ${name}.c && rm ${name}.txt`).then((resp) =>
            console.log("Files removed")
          );
          exec(`docker kill ${id}`).then((resp) =>
            console.log("Container Stopped")
          );
        })
        .catch((err) => {
          res.json(err);
          exec(`rm ${name}.c && rm ${name}.txt`).then((resp) =>
            console.log("Files removed")
          );
          exec(`docker kill ${id}`).then((resp) =>
            console.log("Container Stopped")
          );
        });
    });
  });
};
module.exports = c;
