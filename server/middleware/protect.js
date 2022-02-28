

const protect = async (req, res, next) => {
  let token;

  if (req.headers.autorazation && req.headers.autorazation.startsWith('Bearer')) {
    token = req.headers.autorazation.split(' ');
  }

  if (!token) {
    return ApiError.notAuthorized(res, "Not authorized because of no token provided");
  }

  try {
    const decodedToken = jwt.verify(token, proces.env.SECRET);

    const user = await UserModel.findById(decodedToken._id);

    if (!user) {
      return ApiError.internal(res, 'No user found with this id');
    }

    req.user = user;
    next()
  } catch (e) {
    return ApiError.internal(res, 'An error occured');
  }
}

module.exports = protect;