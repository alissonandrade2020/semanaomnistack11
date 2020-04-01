const crypto = require("crypto");

function generateUniqueId() {
  return crypto.randomBytes(5).toString("HEX");
}

module.exports = generateUniqueId;
