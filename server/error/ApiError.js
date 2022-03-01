class ApiError {

  badRequest(res, message) {
    return res.status(400).json({ message });
  }

  internal(res, message) {
    return res.status(500).json({ message });
  }

  default(res) {
    return res.status(500).json({ message: 'An error occured' });
  }

  notAuthorized(res, message) {
    return res.status(401).json({ message });
  }
}

module.exports = new ApiError;