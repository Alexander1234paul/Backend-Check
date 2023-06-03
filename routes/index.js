const Router = require("express");
const {
    GETTest
  } = require("../controllers/index");




const router = Router();
router.get("/", GETTest);

module.exports = router;
