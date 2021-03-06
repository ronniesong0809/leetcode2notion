const data = require("./data.json");
const { getQuestionDetail } = require("../api/getQuestionDetail");
const dayjs = require("dayjs");

const difficulty = ["Easy 🍀", "Medium", "Hard 🔥"];
const baseUrl = "https://leetcode.com/problems/";
const baseUrlCN = "https://leetcode-cn.com/problems/";

const find = val => {
  return data.stat_status_pairs.find(key => key.stat.frontend_question_id === val);
};

const getTopics = val => {
  var data = getQuestionDetail(val);
  return data.then(result => {
    var topics = [];
    result.map(topicName => {
      var topic = {
        name: topicName.name
      };
      topics.push(topic);
    });
    return topics;
  });
};

const getQuestion = (val, due) => {
  question = find(val);
  return {
    id: question.stat.frontend_question_id,
    title: question.stat.question__title,
    titleSlug: question.stat.question__title_slug,
    url: baseUrl + question.stat.question__title_slug + "/",
    lvl: difficulty[question.difficulty.level - 1],
    frequency: question.frequency,
    date: dayjs().add(due, "day").format()
  };
};

module.exports = { getQuestion, getTopics };
