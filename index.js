const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); // .env読み込み

const app = express();
app.use(bodyParser.json());

const line = require('@line/bot-sdk'); // 追加
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};
const client = new line.Client(config); // 追加

// Webhook受信
app.post('/webhook', (req, res) => {
  const events = req.body.events;
  if (!events || events.length === 0) {
    return res.status(200).end();
  }

  Promise
    .all(events.map((event) => {
      // テキストメッセージだけ処理
      if (event.type === 'message' && event.message.type === 'text') {
        console.log("ユーザー:", event.message.text);
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: `「${event.message.text}」を受け取りました！`
        });
      } else {
        return Promise.resolve(null);
      }
    }))
    .then(() => res.status(200).end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🌟 サーバーがポート ${port} で起動中`);
});
