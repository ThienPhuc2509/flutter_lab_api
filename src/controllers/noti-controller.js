const HistoryNotification = require("../model/HistoryNotification");

class HistoryNotificationController {
  getHistoryNotification = async (req, res) => {
    const username = req.body.username;
    const foundNoti = await HistoryNotification.findOne({ username: username });
    if (!foundNoti) return res.status(404).json({ status: false });
    return res.status(200).json({ status: true, data: foundNoti });
  };
}

module.exports = new HistoryNotificationController();
