const express = require("express");
const line = require("@line/bot-sdk");
const app = express();

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new line.Client(config);

app.use(express.json());

app.post("/webhook", (req, res) => {
  Promise.all(
    req.body.events.map((event) => {
      if (event.type === "message" && event.message.type === "text") {
        console.log("ユーザー:", event.message.text); // ← これでログに表示される！
        return client.replyMessage(event.replyToken, {
          type: "text",
          text: `「${event.message.text}」を受け取りました！`,
        });
      }
    })
  )
    .then(() => res.status(200).end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`サーバーがポート${port}で起動中`);
});
