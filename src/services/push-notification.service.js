const { ONE_SIGNAL_CONFIG } = require("../config/one-signal");
const HistoryNotification = require("../model/HistoryNotification");
async function SendNotification(data, username, callback) {
  let inputMessage = {
    app_id: ONE_SIGNAL_CONFIG.APP_ID,
    contents: {
      en: `${data}`,
    },
    included_segments: ["Active Users"],
    content_available: true,
    small_icon: "ic_notification_icon",
    data: {
      PushTitle: "Thuc hanh Lab Flutter",
    },
  };
  let headers = {
    "Content-Type": "application/json; charset = utf-8",
    Authorization: "Basic " + ONE_SIGNAL_CONFIG.API_KEY,
  };
  const options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers,
  };

  var https = require("https");
  let req = https.request(options, function (res) {
    res.on("data", function (data) {
      console.log(JSON.parse(data));
      return callback(null, JSON.parse(data));
    });
  });
  req.on("error", function (e) {
    return callback({
      message: e,
    });
  });

  req.write(JSON.stringify(inputMessage));
  req.end();

  let foundNoti = await HistoryNotification.findOne({
    username: username,
  });
  if (!foundNoti) {
    const newNoti = await HistoryNotification.create({
      username: username,
      notifications: [],
    });
    const saveNewNoti = await newNoti.save();
    if (!saveNewNoti) return res.status(500).json({ status: false });
    const pushNoti = await HistoryNotification.findOneAndUpdate(
      {
        username: username,
      },
      {
        $push: {
          notifications: {
            content: data,
            dateTime: Date.now(),
          },
        },
      },
      { new: true }
    );
    if (!pushNoti) {
      console.log("Fail to save notification");
    }
  }
  if (foundNoti) {
    const pushNoti = await HistoryNotification.findOneAndUpdate(
      {
        username: username,
      },
      {
        $push: {
          notifications: {
            content: data,
            dateTime: Date.now(),
          },
        },
      },
      { new: true }
    );
    if (!pushNoti) {
      console.log("Fail to save notification");
    }
  }
}

module.exports = { SendNotification };
