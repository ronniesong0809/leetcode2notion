const { Command } = require("commander");
const program = new Command();
const package = require("./package.json");
const { getQuestion, getTopics } = require("./utils/data");
const { notionConfig, createPage } = require("./api/postNewPage");

program.version(package.version);

program
  .requiredOption("-q, --question <leetcode>", "LeetCode question", Number)
  .option("-t, --time <type>", "Add Optional due date", Number)
  .option("-d, --debug", "output extra debugging");

program.addHelpText("after", `\n\nExample call:\n$ custom-help --help`);

const options = program.opts();
program.parse(process.argv);

if (program.debug) console.log(program.opts());
var time = options.time ? options.time : 1;
if (options.question) pipeline();

async function pipeline() {
  notionConfig.key = process.env.NOTION_KEY;
  notionConfig.databaseId = process.env.NOTION_DATABASE_ID;

  const question = getQuestion(options.question, time);
  question.topics = await getTopics(question.titleSlug);
  console.log(question);

  createPage(question);
}
