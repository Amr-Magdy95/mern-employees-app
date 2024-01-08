const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const { body } = require("express-validator");

// validation chains
const createRegisterChain = () => [
  body("username", "Username cannot be empty!")
    .notEmpty()
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Username must be between 4 and 20 chars."),
  body("roles").optional(),
  body("password", "Password cannot be empty")
    .notEmpty()
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 and 20 chars."),
  body("refreshToken").optional().trim().isJWT(),
];

const createLoginChain = () => [
  body("username", "Username cannot be empty!")
    .notEmpty()
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Username must be between 4 and 20 chars."),
  body("password", "Password cannot be empty")
    .notEmpty()
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 and 20 chars."),
];
// auth routes
router.post("/register", createRegisterChain(), AuthController.register);
router.post("/auth", createLoginChain(), AuthController.login);
router.get("/refresh", AuthController.refreshToken);
router.get("/logout", AuthController.logout);

module.exports = router;
