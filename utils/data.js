const data = require("./data.json");
const { getQuestionDetail } = require("../demo/getQuestionDetail");
const dayjs = require("dayjs");

const difficulty = ["Easy 🍀", "Medium", "Hard 🔥"];
const baseUrl = "https://leetcode.com/problems/";
const baseUrlCN = "https://leetcode-cn.com/problems/";

const find = val => {
  return data.stat_status_pairs.find(key => key.stat.question_id === val);
};

const getTopics = val => {
  var data = getQuestionDetail(val);
  data.then(result => {
    topics = [];
    for (let i = 0; i < result.length; i++) {
      topics.push(result[i].name);
    }
    console.log(topics);
    return topics;
  });
};

const getQuestion = (val, due) => {
  question = find(val);
  return {
    id: question.stat.question_id,
    title: question.stat.question__title,
    titleSlug: question.stat.question__title_slug,
    url: baseUrl + question.stat.question__title_slug + "/",
    lvl: difficulty[question.difficulty.level - 1],
    date: dayjs().add(due, "day").format()
  };
};

module.exports = { getQuestion, getTopics };
