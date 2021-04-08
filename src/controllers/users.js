const { AuthService, UserService } = require("../services");
const { HttpCode } = require("../helpers/constants");
const userService = new UserService();
const authService = new AuthService();

const register = async (req, res, next) => {
  const { name, email, password, subscription } = req.body;
  const user = await userService.findUserByEmail(email);
  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      message: "This email is already use",
      data: "Conflict",
    });
  }

  try {
    const newUser = await userService.createUser({
      name,
      email,
      password,
      subscription,
    });
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        avatar: newUser.avatarURL,
        subscription: newUser.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { token, subscription } = await authService.login({
      email,
      password,
    });

    if (token) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          token,
          user: {
            email,
            subscription,
          },
        },
      });
    }

    next({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: "Invalid creadentials",
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await authService.logout(id);
  return res.status(HttpCode.NO_CONTENT).json({
    status: "success",
    code: HttpCode.NO_CONTENT,
  });
};

const getCurrentUser = async (req, res, next) => {
  const user = req.user;
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: {
      user: {
        name: user.name,
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

const updateUser = async (req, res, next) => {
  const userId = req.user.id;
  const user = await userService.updateUser(userId, req.body);
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: {
      user: {
        name: user.name,
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

const updateUserAvatar = async (req, res, next) => {
  const id = req.user.id;
  const pathFile = req.file.path;
  const fileName = req.file.originalname;
  try {
    const newAvatarUrl = await userService.updateUserAvatar(
      id,
      pathFile,
      fileName
    );

    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        avatarURL: newAvatarUrl,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
};
