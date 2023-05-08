const router = require("express").Router();
const Controller = require("../controllers/crypto");

router.get("/buySell", Controller.buySell);




module.exports = router;
