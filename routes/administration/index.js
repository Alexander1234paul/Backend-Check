const Router = require("express");
const { addCompany } = require("../../controllers/administration/index");

const router = Router();
router.post("/", addCompany);

module.exports = router;
