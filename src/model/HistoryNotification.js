const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  notifications: [
    {
      content: {
        type: String,
        require: false,
      },
    },
    {
      dateTime: {
        type: Date,
        require: false,
      },
    },
  ],
});

const HistoryNotification = mongoose.model(
  "HistoryNotification",
  notificationSchema
);
HistoryNotification.createCollection();

module.exports = HistoryNotification;
