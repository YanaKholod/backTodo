const express = require("express");
const { authenticate } = require("../../middleware");
const { controllWrapper } = require("../../helpers");
const authController = require("../../controllers/users/index");
const router = express.Router(); // создаю маршрутизатор для будущего определения маршрутов

router.post("/register", controllWrapper(authController.register));

router.post("/login", controllWrapper(authController.login));

router.post("/logout", authenticate, controllWrapper(authController.logout));

router.get(
  "/current",
  authenticate,
  controllWrapper(authController.getCurrent)
);

module.exports = router; // дальше будет візван в подключении експресс-сервера
