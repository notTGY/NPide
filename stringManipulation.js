function splitInput(value) {
  const arr = value.split('\n');
  let obj = [];
  for (let i = 0; i < arr.length; i++) {
    let e = arr[i];
    obj[i] = {
      value:e,
      len:e.length,
      start:(i?obj[i-1].start+obj[i-1].len:0),
      indentation: 0
    };
    let j = 0;
    while (obj[i].value[j] == ' ' && j < obj[i].len) {
      j++;
      obj[i].indentation++;
    }
  }
  return obj;
}

module.exports = {
  splitInput
};
