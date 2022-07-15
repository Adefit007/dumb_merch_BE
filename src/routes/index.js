const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth");
const {
  addCategory,
  updateCategory,
  getCategories,
  getCategory,
  deleteCategory,
  addCategoryProduct,
} = require("../controllers/category");
const {
  getProduct,
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const {
  getTransactions,
  addTransaction,
} = require("../controllers/transaction");
const {
  addUsers,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

router.post("/user", addUsers);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

router.get("/products", getProducts);
router.post("/product", auth, uploadFile("image"), addProduct);
router.get("/product/:id", getProduct);
router.patch("/product/:id", auth, uploadFile("image"), updateProduct);
router.delete("/product/:id", auth, deleteProduct);

router.get("/transactions", auth, getTransactions);
router.post("/transaction", auth, addTransaction);

router.post("/category", auth, addCategory);
router.post("/category-product", auth, addCategoryProduct);
router.get("/categories", getCategories);
router.get("/category/:id", getCategory);
router.patch("/category/:id", auth, updateCategory);
router.delete("/category/:id", auth, deleteCategory);

router.post("/register", register);
router.post("/login", login);

module.exports = router;
