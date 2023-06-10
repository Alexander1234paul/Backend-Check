const Router = require("express");
const { createCompany, createRol, getAllRoles, updateRol, deleteRolById, getAllUsersByIdStore, createUserInStore } = require("../../controllers/administration/index");

const router = Router();
router.get("/administration/rol", getAllRoles);
router.get("/administration/users/:ID_ALMACEN", getAllUsersByIdStore);
router.post("/administration", createCompany);
router.post("/administration/rol", createRol);
router.post("/administration/users", createUserInStore);
router.put("/administration/rol", updateRol);
router.delete("/administration/rol/:ID_ROL", deleteRolById);

module.exports = router;
