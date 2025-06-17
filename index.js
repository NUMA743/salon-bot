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
     if (event.type === "message" && event.message.type === "text") {// Google Apps ScriptのURL
const GAS_URL = "https://script.google.com/macros/s/AKfycbyIjuCDCTkArGZyj30AwJ1dhNjxXapjmKVRBdmdfh0RmfUp9eiUR_Sqg8CZJ3ig4dPD/exec"; // さっき出たURL

// 送信用のデータを用意
const postData = {
  name: "テスト太郎",         // ← 本番ではユーザー名などに置き換える
  date: "2025-06-17 15:00",  // ← 本番では予約日などに置き換える
  menu: "カット",             // ← メニュー内容に置き換え
  note: event.message.text   // ユーザーが送ってきたテキストをそのまま記録
};

// POST送信
fetch(GAS_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(postData)
})
.then(res => console.log("✅ Google Apps Scriptに送信成功！"))
.catch(err => console.error("❌ 送信エラー", err));

  console.log("🌟 メッセージ受信！");
  console.log("ユーザー:", event.source.userId);
  console.log("内容:", event.message.text);

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: `「${event.message.text}」を受け取りました！`
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
