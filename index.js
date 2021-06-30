const { Command } = require("commander");
const program = new Command();
const package = require("./package.json");
const { getQuestion, getTopics } = require("./utils/data");
const { notionConfig, createPage } = require("./api/postNewPage");

const config = (key, database) => {
  notionConfig.key = key;
  notionConfig.databaseId = database;
};

const addQuestionToNtion = async (id, time) => {
  var time = time || 1;

  const question = getQuestion(id, time);
  console.log(question);

  const topics = getTopics(question.titleSlug);
  await createPage(question, topics);
};

module.exports = { config, addQuestionToNtion };
