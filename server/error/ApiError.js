class ApiError {

  badRequest(res, message) {
    return res.status(400).json({ message: message });
  }

  internal(res, message) {
    return res.status(500).json({ message: message });
  }
}

module.exports = new ApiError;