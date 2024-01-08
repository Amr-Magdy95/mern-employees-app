const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const verifyRoles = require("../middleware/verifyRoles.middleware");
const ROLES_LIST = require("../config/roles_list.config");

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), UserController.getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), UserController.deleteUser);

router.route("/:id").get(verifyRoles(ROLES_LIST.Admin), UserController.getUser);

module.exports = router;
