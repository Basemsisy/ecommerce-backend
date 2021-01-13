/**
 * @param {*} res
 * @param {*} data
 * @param {string} message
 * @param {boolean} status
 */
const response = (res, data, message, status) => {
  res.send({ data, message, status });
};
module.exports = response;
