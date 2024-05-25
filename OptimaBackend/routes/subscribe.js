const espress = require("express");
const { subscribePush } = require("../controllers/subscribeController");

const router = espress.Router();

router.post("/", subscribePush);

module.exports = router;
