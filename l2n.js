const data = require("./index");
const dayjs = require("dayjs")

const baseUrl = "https://leetcode.com/problems/";
const difficulty = ["Easy 🍀", "Medium", "Hard 🔥"];

function getQuestion(val, due) {
  question = data.find(val);
  return {
    id: question.stat.question_id,
    title: question.stat.question__title,
    url: baseUrl + question.stat.question__title_slug + "/",
    lvl: difficulty[question.difficulty.level - 1],
    date: dayjs().add(due, 'day').format()
  };
}

async function main() {
  var myArgs = process.argv.slice(2);
  const question = getQuestion(Number(myArgs[0]), 0);
  console.log(question);
}

main();
