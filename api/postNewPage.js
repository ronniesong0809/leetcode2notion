const { Client } = require("@notionhq/client");
const dotenv = require("dotenv");
dotenv.config();

let notionConfig = {};

const createPage = async (data) => {
  const notion = new Client({ auth: notionConfig.key });
  const databaseId = notionConfig.databaseId;

  const createPage =  notion.pages.create({
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
      Frequency: {
        number: data.frequency
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
        multi_select: data.topics
      }
    }
  });
  // console.log(data);
  // console.log(topics);

  return createPage;
};

const getDatabaseTagOptions = async () => {
  const databaseResponse = await notion.databases.retrieve({
    database_id: databaseId
  });
  const tagProperty = databaseResponse.properties["Topics"];
  return tagProperty.multi_select.options;
};

module.exports = { notionConfig, createPage, getDatabaseTagOptions };
