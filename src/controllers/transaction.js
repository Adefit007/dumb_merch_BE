const { transaction, product, user } = require("../../models");

exports.getTransactions = async (req, res) => {
  try {
    const data = await transaction.findAll({
      include: [
        {
          model: product,
          as: "product",
          attributes: {
            exclude: ["createdAt", "updatedAt", "id"],
          },
        },
        {
          model: user,
          as: "buyer",
          attributes: {
            exclude: ["createdAt", "updatedAt", "id", "password"],
          },
        },
        {
          model: user,
          as: "seller",
          attributes: {
            exclude: ["createdAt", "updatedAt", "id", "password"],
          },
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "idUser",
          "idBuyer",
          "idProduct",
          "idSeller",
        ],
      },
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      data,
    });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const data = req.body;
    await transaction.create(data);

    res.status(201).send({
      status: "success",
      message: "Add transaction success",
      data: {
        transaction: data,
      },
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: "server error",
    });
  }
};
