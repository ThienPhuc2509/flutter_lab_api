const notiRouter = require("express").Router();
const HistoryNotificationController = require("../controllers/noti-controller");

notiRouter.post("/", HistoryNotificationController.getHistoryNotification);

module.exports = notiRouter;
