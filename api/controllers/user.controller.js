import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const user = (req, res) => {
  res.json({ message: "Testing user router" });
};

export const test = (req, res) => {
  res.json({ message: "Testing route" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(401, "You are can only update your own account");

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;

    return res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(403, "You can delete only your account"));
  {
    try {
      await User.findByIdAndDelete(req.user.id);
      res.clearCookie("accessToken");
      res.status(200).json("User has been deleted");
    } catch (error) {
      next(error);
    }
  }
};
