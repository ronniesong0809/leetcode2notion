const data = require("./index");
const { Client } = require("@notionhq/client");
const dayjs = require("dayjs")
const dotenv = require("dotenv");
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

const difficulty = ["Easy 🍀", "Medium", "Hard 🔥"];
const baseUrl = "https://leetcode.com/problems/";
const baseUrlCN = "https://leetcode-cn.com/problems/";

async function createPage(data) {
  return notion.pages.create({
    parent: {
      database_id: databaseId
    },
    properties: {
      Name: {
        title: [
          {
            type: "text",
            text: {
              content: data.title
            }
          }
        ]
      },
      Number: {
        number: data.id
      },
      Difficulty: {
        select: {
          name: data.lvl
        }
      },
      URL: {
        url: data.url
      },
      Due: {
        date: {
          start: data.date
        }
      }
    }
  });
}

async function getDatabaseTagOptions() {
  const databaseResponse = await notion.databases.retrieve({
    database_id: databaseId
  });
  const tagProperty = databaseResponse.properties["Topics"];
  return tagProperty.multi_select.options;
}

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
  await createPage(question);

  // const options = await getDatabaseTagOptions();
  // console.log(options);
}

main();
