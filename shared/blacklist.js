var pythonList = ["import os", "import subprocess","from os import","from subprocess import"];
var cppList = ["popen", "fork", "system(", "unistd.h"];
var javaList = [
  "Process",
  "getRuntime()",
  "exec(",
  "ProcessBuilder",
  "start()",
];
var goList = [
  "os/exec",
  "runtime"
]
exports.pythonList = pythonList;
exports.cppList = cppList;
exports.javaList = javaList;
exports.goList = goList;
