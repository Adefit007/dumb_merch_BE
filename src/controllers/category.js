const { category, categoryProduct } = require("../../models");

exports.addCategory = async (req, res) => {
  try {
    await category.create(req.body);

    res.send({
      status: "Success",
      message: "Add Category Finished ",
      category,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const data = await category.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });
    res.send({
      status: "success",
      message: "categories",
      data: {
        categories: data,
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

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await category.findAll({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data: {
        category: data,
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

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await category.update(req.body, {
      where: { id },
    });
    res.send({
      status: "success",
      message: "data updated",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await category.destroy({
      where: { id },
    });
    res.send({
      status: "success",
      message: "data deleted",
      id,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.addCategoryProduct = async (req, res) => {
  try {
    await categoryProduct.create(req.body);

    res.send({
      status: "success",
      message: "add category product Finished",
      categoryProduct,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "failed",
      message: "server error",
    });
  }
};
