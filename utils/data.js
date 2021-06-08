const data = require("./data.json");
const dayjs = require("dayjs");

const difficulty = ["Easy 🍀", "Medium", "Hard 🔥"];
const baseUrl = "https://leetcode.com/problems/";
const baseUrlCN = "https://leetcode-cn.com/problems/";

const find = val => {
  return data.stat_status_pairs.find(key => key.stat.question_id === val);
};

const getQuestion = (val, due) => {
  question = find(val);
  return {
    id: question.stat.question_id,
    title: question.stat.question__title,
    url: baseUrl + question.stat.question__title_slug + "/",
    lvl: difficulty[question.difficulty.level - 1],
    date: dayjs().add(due, "day").format()
  };
};

module.exports = { getQuestion };
