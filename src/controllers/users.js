const { AuthService, UserService, EmailService } = require("../services");
const { HttpCode } = require("../helpers/constants");
const { ErrorHandler } = require("../helpers/errorHandler");
const userService = new UserService();
const authService = new AuthService();
const emailService = new EmailService();

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
    const result = await authService.login({
      email,
      password,
    });

    if (result) {
      const { token, subscription } = result;
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
    }

    next({
      status: HttpCode.UNAUTHORIZED,
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

const verify = async (req, res, next) => {
  try {
    const result = await userService.verify(req.params);
    if (result) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          message: "Verification successful",
        },
      });
    } else {
      return next({
        status: HttpCode.BAD_REQUEST,
        message:
          "Your verification token is not valid. Contact with administration ",
      });
    }
  } catch (e) {
    next(e);
  }
};

const resend = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: "error",
        code: HttpCode.BAD_REQUEST,
        message: "missing required field email",
      });
    }

    const user = await userService.findUserByEmail(email);

    if (user.verify) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: "error",
        code: HttpCode.BAD_REQUEST,
        message: "Verification has already been passed",
      });
    }

    const { verifyToken } = user;

    

    try {
      await emailService.sendEmail(verifyToken, email, name);
    } catch (err) {
      throw new ErrorHandler(503, err.message, "Service Unavailable");
    }

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      message: "Verification email sent",
    });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await userService.getCurrentUser(userId);
    if (user) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          user,
        },
      });
    } else {
      return next({
        status: HttpCode.UNAUTHORIZED,
        message: "Invalid credentials",
      });
    }
  } catch (e) {
    next(e);
  }
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
  try {
    const id = req.user.id;
    const pathFile = req.file.path;
    const newAvatarUrl = await userService.updateUserAvatar(id, pathFile);

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
  verify,
  resend,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
};
