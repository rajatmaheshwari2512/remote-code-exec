const java = require("../languages/java");

var pythonList = ["import os", "import subprocess"];
var cppList = ["popen", "fork", "system(", "unistd.h", "exec"];
var javaList = [
  "Process",
  "getRuntime()",
  "exec(",
  "ProcessBuilder",
  "start()",
];
exports.pythonList = pythonList;
exports.cppList = cppList;
exports.javaList = javaList;
