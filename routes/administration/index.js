const Router = require("express");
const { postCompany, postRol, getAllRoles, updateRol, deleteRolById } = require("../../controllers/administration/index");

const router = Router();
router.post("/administration", postCompany);
router.post("/administration/rol", postRol);
router.get("/administration/rol", getAllRoles);
router.put("/administration/rol", updateRol);
router.delete("/administration/rol/:ID_ROL", deleteRolById);

module.exports = router;
