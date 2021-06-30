const l2n = require("./index");

l2n.config(
  (key = process.env.NOTION_KEY),
  (databaseId = process.env.NOTION_DATABASE_ID)
);
l2n.addQuestionToNtion(21);
