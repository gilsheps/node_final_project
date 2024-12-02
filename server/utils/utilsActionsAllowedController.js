const fs = require("fs");
const path = require("path");

// const filePath = '../../data/actionsAllowed.json'
const filePath = path.join(__dirname, "../data/", "actionsAllowed.json");
const today = new Date().toJSON().slice(0, 10);

function readJsonFile() {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return [data, data.actions];
}
function writeJsonFile(jsonArray) {
  fs.writeFileSync(filePath, JSON.stringify(jsonArray, null, 2));
}

function findObj(arr, id) {
  return arr.find((data) => data.date == today && data.id == id);
}

module.exports = { readJsonFile, writeJsonFile, findObj };
