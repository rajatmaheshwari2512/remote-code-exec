const fs = require("fs");

const validate = (list, code) => {
  for (let i = 0; i < list.length; i++) {
    if (code.includes(list[i])) {
      return false;
    }
  }
  return true;
};
module.exports = validate;
