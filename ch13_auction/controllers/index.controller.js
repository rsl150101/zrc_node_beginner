const { Op } = require("sequelize");
const { Good, Auction, User, sequelize } = require("../models");
const schedule = require("node-schedule");

exports.renderMain = async (req, res, next) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const goods = await Good.findAll({
      where: { SoldId: null, createdAt: { [Op.gte]: yesterday } },
    });
    res.render("main", {
      title: "NodeAuction",
      goods,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.renderJoin = (req, res) => {
  res.render("join", {
    title: "회원가입 - NodeAuction",
  });
};

exports.renderGood = (req, res) => {
  res.render("good", { title: "상품 등록 - NodeAuction" });
};

exports.createGood = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const good = await Good.create({
      OwnerId: req.user.id,
      name,
      img: req.file.filename,
      price,
    });
    const end = new Date();
    end.setMinutes(end.getMinutes() + 1);

    const job = schedule.scheduleJob(end, async () => {
      const success = await Auction.findOne({
        where: { GoodId: good.id },
        order: [["bid", "DESC"]],
      });
      await good.setSold(success.UserId);
      await User.update(
        {
          money: sequelize.literal(`money - ${success.bid}`),
        },
        {
          where: { id: success.UserId },
        }
      );
    });
    job.on("error", console.error);
    job.on("success", () => {
      console.log(`${good.id} success scheduling`);
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.renderAuction = async (req, res, next) => {
  try {
    const [good, auction] = await Promise.all([
      Good.findOne({
        where: { id: req.params.id },
        include: {
          model: User,
          as: "Owner",
        },
      }),
      Auction.findAll({
        where: { GoodId: req.params.id },
        include: { model: User },
        order: [["bid", "ASC"]],
      }),
    ]);
    res.render("auction", {
      title: `${good.name} - NodeAuction`,
      good,
      auction,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.bid = async (req, res, next) => {
  try {
    const { bid, msg } = req.body;
    const good = await Good.findOne({
      where: { id: req.params.id },
      include: { model: Auction },
      order: [[{ model: Auction }, "bid", "DESC"]],
    });
    if (!good) {
      return res.status(404).send("Not exist good");
    }
    if (good.price >= bid) {
      return res
        .status(403)
        .send("You must bid higher than the starting price");
    }
    if (new Date(good.createdAt).valueOf() + 24 * 60 * 60 * 1000 < new Date()) {
      return res.status(403).send("Auction has already ended");
    }
    if (good.Auctions[0]?.bid >= bid) {
      return res.status(403).send("You must bid higher than your previous bid");
    }

    const result = await Auction.create({
      bid,
      msg,
      UserId: req.user.id,
      GoodId: req.params.id,
    });
    req.app.get("io").to(req.params.id).emit("bid", {
      bid: result.bid,
      msg: result.msg,
      nick: req.user.nick,
    });
    return res.send("Ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
