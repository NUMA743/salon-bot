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
// ユーザーが送ったメッセージを分割する（空白で4分割）
const parts = event.message.text.split(" ");
const name = parts[0] || "";
const date = parts[1] || "";
const menu = parts[2] || "";
const note = parts.slice(3).join(" ") || "";

// 送信用のデータを用意
const postData = {
 const postData = {
  name,
  date,
  menu,
  note
};

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
