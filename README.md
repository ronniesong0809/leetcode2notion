# LeetCode to Notion.so Integration

Use Notion to Learn LeetCode problems

## Getting Started
1. Duplicate this notion [database template](https://practicealgorithms.notion.site/practicealgorithms/8fc1d7f8b65f4c9599f79cf935164caa?v=fc273aff987d4424846a18b616e261c8)

2. [Create an integration](https://developers.notion.com/docs/getting-started)

<p align="center">
  <img src="https://files.readme.io/2ec137d-093ad49-create-integration.gif" width="400" />
</p>

3. [Share a database with your integration](https://developers.notion.com/docs/getting-started)

<p align="center">
  <img src="https://files.readme.io/0a267dd-share-database-with-integration.gif" width="400" />
</p>

4. [Sign up Twilio](https://www.twilio.com/try-twilio), and get TWILIO_AUTH_TOKEN

3. Install dependencies
```
npm install
```

4. Create an .env file with your notion key and twilio auth token
```
NOTION_KEY=
NOTION_DATABASE_ID=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_FROM_PHONE_NUMBER=
TWILIO_TO_PHONE_NUMBER=
```

## Usages
Option 1: command-line interface
```
$ node cli.js -h
Usage: cli [options]

Options:
  -V, --version              output the version number
  -q, --question <leetcode>  LeetCode question
  -t, --time <type>          Add Optional due date
  -d, --debug                output extra debugging
  -h, --help                 display help for command
```

Option 2: module
```
$ node demo.js
```

## License
MIT