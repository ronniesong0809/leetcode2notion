const { Client } = require("@notionhq/client");
const dotenv = require("dotenv");
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

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

module.exports = { createPage, getDatabaseTagOptions };
