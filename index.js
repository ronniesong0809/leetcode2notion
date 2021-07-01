const { getQuestion, getTopics } = require("./utils/data");
const { notionConfig, createPage } = require("./api/postNewPage");

const config = (key, database) => {
  notionConfig.key = key;
  notionConfig.databaseId = database;
};

const addQuestionToNotion = async(id, time) => {
  var time = time || 1;

  const question = getQuestion(id, time);
  question.topics = await getTopics(question.titleSlug);

  createPage(question);
};

module.exports = { config, addQuestionToNotion };
