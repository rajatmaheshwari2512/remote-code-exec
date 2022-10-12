let pythonList = ["import os", "import subprocess","from os import","from subprocess import"];
let cppList = ["popen", "fork", "system(", "unistd.h"];
let cList = ["fork", "system("];
let javaList = [
  "Process",
  "getRuntime()",
  "exec(",
  "ProcessBuilder",
  "start()",
];
let goList = [
  "os/exec",
  "runtime"
]
exports.pythonList = pythonList;
exports.cppList = cppList;
exports.javaList = javaList;
exports.goList = goList;
exports.cList = cList;