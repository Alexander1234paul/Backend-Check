const Router = require("express");
const {
    login, register
  } = require("../../controllers/authentication/index");


const router = Router();

router.post("/login", login);
router.post("/register", login);


module.exports = router;
