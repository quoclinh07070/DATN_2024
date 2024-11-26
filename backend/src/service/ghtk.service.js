const axios = require("axios");
require("dotenv").config();

const GHTK_BASE_URL = process.env.GHTK_BASE_URL || "https://services-staging.ghtklab.com/services";
const GHTK_API_KEY = process.env.GHTK_API_KEY;

const ghtkHeaders = {
  Token: GHTK_API_KEY,
  "Content-Type": "application/json",
};

/**
 * Tạo đơn vận chuyển GHTK
 */
const createShipment = async (shipmentInfo) => {
  try {
    const response = await axios.post(
      `${GHTK_BASE_URL}/shipment/order`,
      {
        pick_name: shipmentInfo.pickName,
        pick_address: shipmentInfo.pickAddress,
        pick_tel: shipmentInfo.pickPhone,
        name: shipmentInfo.receiverName,
        address: shipmentInfo.receiverAddress,
        tel: shipmentInfo.receiverPhone,
        weight: shipmentInfo.weight,
        value: shipmentInfo.orderValue, // Giá trị đơn hàng
        transport: "road", // hoặc "fly" (máy bay)
      },
      { headers: ghtkHeaders }
    );
    return response.data.order.label; // Mã vận chuyển
  } catch (error) {
    console.error("Error creating GHTK shipment:", error.response.data);
    throw error;
  }
};

/**
 * Theo dõi trạng thái đơn vận chuyển từ GHTK
 */
const trackShipment = async (trackingCode) => {
  try {
    const response = await axios.get(
      `${GHTK_BASE_URL}/shipment/v2/${trackingCode}`,
      { headers: ghtkHeaders }
    );
    return response.data;
  } catch (error) {
    console.error("Error tracking GHTK shipment:", error.response.data);
    throw error;
  }
};

module.exports = { createShipment, trackShipment };
