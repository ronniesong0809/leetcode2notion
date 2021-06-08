const { Command } = require("commander");
const program = new Command();
const { getQuestion, getTopics } = require("./utils/data");
const { createPage, getDatabaseTagOptions } = require("./api/postNewPage");

program.version("0.0.1");

program
  .requiredOption("-q, --question <leetcode>", "LeetCode question", Number)
  .option("-t, --time <type>", "Add Optional due date", Number)
  .option("-d, --debug", "output extra debugging");

program.addHelpText("after", `\n\nExample call:\n$ custom-help --help`);

const options = program.opts();
program.parse(process.argv);

if (program.debug) console.log(program.opts());
var time = options.time ? options.time : 0;
if (options.question) pipeline();

async function pipeline() {
  const question = getQuestion(options.question, time);
  console.log(question);
  
  // const tags = await getDatabaseTagOptions();
  // console.log(tags);
  const topics = getTopics(question.titleSlug);
  await createPage(question, topics);
}
