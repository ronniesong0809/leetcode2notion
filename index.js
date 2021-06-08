const data = require("./data.json")

module.exports.find = function (val) {
  return data.stat_status_pairs.find((key) => key.stat.question_id === val);
};