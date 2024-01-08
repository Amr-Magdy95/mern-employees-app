const router = require("express").Router();
const EmployeeController = require("../controllers/employee.controller");
const { body } = require("express-validator");
// query('person').notEmpty().escape()
// .optional() .trim() .isEmail() .isLength({})
// const createNameChain = () => body("name").trim().notEmpty().isLength({min: 3, max: 20}).withMessage("Not a valid Email ")
// body("email").custom(async (value) => {
//   const user = await UserCollection.findUserByEmail(value);
//   if (user) {
//     throw new Error("E-mail already in use");
//   }
// }),
// body('passwordConfirmation').custom((value, { req }) => {
//     return value === req.body.password;

//   }),

router.get("/", EmployeeController.getAllEmployees);
router.get("/:employeeId", EmployeeController.getEmployee);
router.post("/", EmployeeController.createNewEmployee);
router.patch("/:id", EmployeeController.updateEmployee);
router.delete("/:id", EmployeeController.deleteEmployee);

module.exports = router;
