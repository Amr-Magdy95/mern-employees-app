module.exports = class CustomAPIError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
};
