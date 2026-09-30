const fs = require("fs/promises")
const path = require("path");
let filepath = path.join(__dirname, "../db.json");


async function readData() {
  let data = await fs.readFile(filepath, "utf-8")
  return JSON.parse(data)
}

async function delayReadData() {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 1500)
  })
  return await readData();
}

async function writeData(data) {
  await fs.writeFile(filepath, JSON.stringify(data, null, 2), "utf-8")
}

module.exports = { readData, delayReadData, writeData }
