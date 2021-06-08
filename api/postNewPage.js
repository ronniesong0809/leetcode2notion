const { Client } = require("@notionhq/client");
const dotenv = require("dotenv");
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

const createPage = async (data, val) => {
  val.then(topics => {
    console.log(topics)
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
        },
        Topics: {
          multi_select: topics
        }
      }
    });
  });
};

const getDatabaseTagOptions = async () => {
  const databaseResponse = await notion.databases.retrieve({
    database_id: databaseId
  });
  const tagProperty = databaseResponse.properties["Topics"];
  return tagProperty.multi_select.options;
};

module.exports = { createPage, getDatabaseTagOptions };
