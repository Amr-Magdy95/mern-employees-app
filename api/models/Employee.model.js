const { Schema, model } = require("mongoose");

const EmployeeSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

module.exports = model("Employee", EmployeeSchema);
