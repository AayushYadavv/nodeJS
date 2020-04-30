/** @format */

const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const scyrpt = util.promisify(crypto.scrypt);
const repo = require("./repo.js");
class prodRepo extends repo {}

module.exports = new prodRepo("products.json");
