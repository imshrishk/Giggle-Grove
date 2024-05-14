const express = require("express");
const router = express.Router();
const dishController = require("../controllers/dishController");

// Define routes for dishes
router.get("/", dishController.getDishes);
router.get("/:id", dishController.getDishById);

module.exports = router;