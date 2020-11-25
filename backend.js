const monk = require("monk");

const password = require("./secrets").password;

const uri = `mongodb+srv://ide-backend:${password}@cluster0.5xlpu.mongodb.net/ide-backend?retryWrites=true&w=majority`;

const db = monk(uri);

const collection = db.collection("code");

async function findCode(token) {
  const cache = await collection.findOne({ token: token });
  if (!cache) return "";
  return cache.code;
}

async function insertCode(token, code) {
  const cache = await collection.count({ token: token });
  console.log(cache);
  if (cache < 1) {
    let timeStart = (new Date()).getTime();
    return collection.insert({ token: token, code: code, time: timeStart });
  }
  console.log("updating code");
  return collection.update({ token: token }, { $set: { code: code } });
}

module.exports = {
  collection,
  findCode,
  insertCode
};
