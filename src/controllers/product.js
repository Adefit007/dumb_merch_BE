const { product, user, category, categoryProduct } = require("../../models");

exports.getProducts = async (req, res) => {
  try {
    let data = await product.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: category,
          as: "categories",
          attributes: {
            exclude: ["createdAt", "updatedAt", "id"],
          },
          through: {
            model: categoryProduct,
            as: "bridge",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        image: process.env.PATH_FILE + item.image,
      };
    });

    res.status(200).send({
      status: "success",
      dataUser: req.user.id,
      data: {
        product: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const data = req.body;
    let newProduct = await product.create({
      ...data,
      image: req.file.filename,
      idUser: req.user.id,
    });

    newProduct = JSON.parse(JSON.stringify(newProduct));

    newProduct = {
      ...newProduct,
      image: process.env.PATH_FILE + newProduct.image,
    };

    res.status(201).send({
      status: "success",
      message: "Add product success",
      data: { newProduct },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await product.findAll({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        image: process.env.PATH_FILE + item.image,
      };
    });

    res.send({
      status: "success",
      data: {
        product: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await product.update(req.body, {
      where: { id },
    });
    res.send({
      status: "success",
      message: `product ${id} updated`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await product.destroy({
      where: { id },
    });
    res.send({
      status: "success",
      message: `Product ${id} deleted`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};
