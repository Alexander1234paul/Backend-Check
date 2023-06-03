const Router = require("express");
const {
    GETTest, addPerson, addCompany, addTest
  } = require("../../controllers/authentication/index");


const router = Router();
router.get("/", GETTest);
// router.post("/", addPerson);
// router.post("/", addCompany);
router.post("/", addTest);

module.exports = router;
