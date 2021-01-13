const errorHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError")
    res.status(401).json({ message: "err! unauthorized" });
};

module.exports = errorHandler;
