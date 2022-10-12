const util = require("util");
const exec = util.promisify(require("child_process").exec);
let fs = require("fs");

const cpp = (input, res, name) => {
  fs.writeFile(`${name}.txt`, input, (err) => {
    if (err) res.json({ error: err });
    exec("docker run -d -it cpp:v1 /bin/bash").then((resp) => {
      let id = resp.stdout.substring(0, 12);
      exec(
        `docker cp ${name}.cpp ${id}:/usr/src/app/test.cpp && docker cp ${name}.txt ${id}:/usr/src/app/input.txt && docker exec ${id} bash -c "g++ test.cpp && ./a.out<input.txt"`,
        { timeout: 10000, maxBuffer: 50000 }
      )
        .then((resp) => {
          res.json(resp);
          exec(`rm ${name}.cpp && rm ${name}.txt`).then((resp) =>
            console.log("Files removed")
          );
          exec(`docker kill ${id}`).then((resp) =>
            console.log("Container Stopped")
          );
        })
        .catch((err) => {
          res.json(err);
          exec(`rm ${name}.cpp && rm ${name}.txt`).then((resp) =>
            console.log("Files removed")
          );
          exec(`docker kill ${id}`).then((resp) =>
            console.log("Container Stopped")
          );
        });
    });
  });
};
module.exports = cpp;
