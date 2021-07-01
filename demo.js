const l2n = require("./index");

l2n.config(process.env.NOTION_KEY, process.env.NOTION_DATABASE_ID);
l2n.addQuestionToNotion(21);
