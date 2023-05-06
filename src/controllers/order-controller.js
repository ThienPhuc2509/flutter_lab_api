const Order = require("../model/Oder");
const Food = require("../model/Food");
const User = require("../model/User");
const Notification = require("../model/HistoryNotification");
const _ = require("lodash");
const pushNotificationService = require("../services/push-notification.service");
const { ONE_SIGNAL_CONFIG } = require("../config/one-signal");

class OrderController {
  getOrders = async (req, res) => {
    const id = req.params.id;
    console.log(req.parmas);
    const user = await User.findOne({ _id: id });
    if (!user) {
      console.log(req.parmas);
      return res.status(404).json({ status: false });
    }
    let orders = await Order.find({ username: user.username, status: false })
      .populate("orderDetail")
      .lean();
    const ordersRes = orders[0];
    return res.status(200).json({ status: true, data: { orders: ordersRes } });
  };

  createOrders = async (req, res) => {
    const username = req.body.username;
    const address = req.body.address;
    const addFood = req.body.addFood;
    const orderId = req.body.orderId;
    if (!orderId) {
      const order = await Order.create({
        username: username,
        address: address,
        createOnDate: Date.now(),
        orderDetail: [],
      });
      const savedOrder = await order.save();
      try {
        const updatedOrder = await Order.findOneAndUpdate(
          {
            _id: savedOrder._id,
          },
          {
            $push: { orderDetail: addFood },
          },
          { new: true }
        );
        if (!updatedOrder) return res.status(503).json({ status: false });
        return res.status(200).json({ status: true, data: { updatedOrder } });
      } catch (err) {
        return res.json(err);
      }
    }
    // update Order
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      {
        $push: { orderDetail: addFood },
      },
      { new: true }
    );
    return res.status(200).json({ status: true, data: { updatedOrder } });
  };

  removeItem = async (req, res) => {
    const orderId = req.body.orderId;
    const positionFood = req.body.positionFood;

    let orders = await Order.findOne({ _id: orderId });
    console.log(orders);
    // orders.forEach((order) => {
    //   order.orderDetail.splice(1, 1);
    // });
    orders.orderDetail.splice(positionFood, 1);
    console.log(`index: `, positionFood);
    orders.save();
    res.status(200).json({ status: true, data: orders });
  };
  checkout = async (req, res) => {
    const orderId = req.body.orderId;
    const order = await Order.findOne({ _id: orderId });
    if (!order) return res.status(404).json({ status: false });
    const checkout = await Order.findOneAndUpdate(
      { _id: orderId },
      { $set: { status: true } },
      { new: true }
    );

    let sendingOrderMessage = `Đơn hàng ${orderId} đang được giao đến cho ${order.username}`;
    let sentOrderMessage = `Đơn hàng ${orderId} đã được giao đến cho ${order.username}`;
    setTimeout(() => {
      pushNotificationService.SendNotificationToDevice(
        [""],
        sendingOrderMessage,
        checkout.username,
        (error, results) => {
          if (error) {
            console.log(err);
          }
          console.log(results);
        }
      );
    }, 5000);
    setTimeout(() => {
      pushNotificationService.SendNotificationToDevice(
        [""],
        sentOrderMessage,
        checkout.username,
        (error, results) => {
          if (error) {
            console.log(err);
          }
          console.log(results);
        }
      );
    }, 10000);

    return res.status(200).json({ status: true, data: { checkout } });
  };

  sumOrder = async (req, res) => {
    const orderId = req.body.orderId;
    let orders = await Order.find({ _id: orderId })
      .populate("orderDetail")
      .lean();
    if (!orders) return res.status(404).json({ status: false });
    const orderDetail = orders[0].orderDetail;
    const total = orderDetail.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    );
    console.log(total);
    return res.status(200).json({ status: true, data: { total: total } });
  };

  getCheckout = async (req, res) => {
    const username = req.body.username;
    const histories = await Order.find({ username: username, status: true });
    if (!histories) return res.status(404).json({ status: false });
    return res.status(200).json({ status: true, checkoutOrder: { histories } });
  };
}

module.exports = new OrderController();
