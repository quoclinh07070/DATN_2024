const express = require("express");
const router = express.Router();
const ghtkService = require("../service/ghtk.service");

// GHTK Routes
router.post("/ghtk/fee", async (req, res) => {
  try {
    // GHTK không có API tính phí riêng mà phí được tự động trả về khi tạo đơn
    res.status(400).send("GHTK không hỗ trợ API tính phí riêng.");
  } catch (error) {
    res.status(500).send("Error calculating GHTK shipping fee.");
  }
});

router.post("/ghtk/create", async (req, res) => {
  try {
    const orderCode = await ghtkService.createShipment(req.body);
    res.json({ orderCode });
  } catch (error) {
    res.status(500).send("Error creating GHTK order.");
  }
});

module.exports = router;
